import { EEventType } from "./shared/EEventType"

const express = require('express');
const app = express();
const server = require('http').Server(app);
 
app.use(express.static(__dirname + '/public'));

 //@ts-ignore
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

const io = require('socket.io').listen(server);

/* Globals */
let SHIPS = new Map<number, any>();
let PLAYERS = new Map<number, any>();
let nextPlayerId = 0;
let nextGameObjectId = 0;

//@ts-ignore
io.on('connection', function (socket) {
  console.log('a user connected');
  let playerId = nextPlayerId++;
  let shipId = nextGameObjectId++;

  let newPlayer : any = createNewPlayer(playerId, shipId, socket);
  PLAYERS.set(playerId, newPlayer);
  SHIPS.set(shipId, newPlayer.ship);
  socket.emit('ServerEvent', {type: EEventType.PLAYER_LOAD_EVENT, 
    data: {
      ship : PLAYERS.get(playerId).ship
    }
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    SHIPS.delete(shipId);
    PLAYERS.delete(playerId);
    sendPlayerDisconnected(shipId);
  });

  socket.on('ClientEvent', function(event : any){
    handleClientEvent(PLAYERS.get(playerId), event);
  });
});

setInterval(update, 1000/25);

//Server functions
function update() {
  updateShipPositions();
  sendGameObjectUpdate();
}

function updateShipPositions() {
  SHIPS.forEach((ship: any, key: number) => {
    if(ship.isMoving) {
      let xLength = ship.destinationX - ship.x;
      let yLength = ship.destinationY - ship.y;
      let length = Math.sqrt((xLength * xLength) + (yLength * yLength));
      if(length <= ship.speed) {
        ship.isMoving = false;
        ship.x = ship.destinationX;
        ship.y = ship.destinationY;
      } else {
        ship.x = ship.x + (xLength / length) * ship.speed;
        ship.y = ship.y + (yLength / length) * ship.speed;
      }
    }
  });
}

function sendGameObjectUpdate() {
  function createGameObjectUpdatePacket() {
    let result: Array<any> = [];
    PLAYERS.forEach((player: any, key: number) => {
      result.push(player.ship);
    });
    return result;
  }
  let packet : any = createGameObjectUpdatePacket()
  PLAYERS.forEach((player: any, key: number) => {
    player.socket.emit('ServerEvent', {type: EEventType.GAME_OBJECT_UPDATE_EVENT, data: packet})
  });
}

function sendPlayerDisconnected(disconnectedShipId : number) {
  function createPlayerDisconnectedPacket() {
    return {shipId : disconnectedShipId};
  }
  let packet : any = createPlayerDisconnectedPacket()
  PLAYERS.forEach((player: any, key: number) => {
    player.socket.emit('ServerEvent', {type: EEventType.PLAYER_DISCONNECTED_EVENT, data: packet})
  });
}

function handleClientEvent(player : any, event : any) {
   switch(event.type)  {
     case EEventType.PLAYER_SET_NEW_DESTINATION_EVENT : {
       onPlayerSetNewDestinationEvent(player, event.data.mouseX, event.data.mouseY);
       break;
     }
     default: {
       break;
     }
   }
}

function createNewPlayer(playerId : number, shipId : number, socket : any) {
  let ship : Object = {
    id: shipId,
    x : 0,
    y : 0,
    speed: 2,
    isMoving : false,
    destinationX : 0,
    destinationY : 0
  }
  
  let newPlayer : Object = {
    socket : socket,
    ship : ship
  }

  return newPlayer;
}

//Server event functions
function onPlayerSetNewDestinationEvent(player : any, newDestinationX : number, newDestinationY : number) {
  let xLength = player.ship.x - newDestinationX;
  let yLength = player.ship.y - newDestinationY;
  let length = Math.sqrt(xLength * xLength + yLength * yLength);
  if(length != 0) {
    player.ship.isMoving = true;
    player.ship.destinationX = newDestinationX;
    player.ship.destinationY = newDestinationY;
  } 
}