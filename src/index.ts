import { Events } from "./shared/Events"
import { DataObjects } from "./shared/DataObjects";

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
let SHIPS = new Map<number, DataObjects.Ship>();
let PLAYERS = new Map<number, DataObjects.Player>();
let nextPlayerId = 0;
let nextGameObjectId = 0;

//@ts-ignore
io.on('connection', function (socket) {
  function createPlayerLoadEventPacket(ship : DataObjects.Ship) {
    let packet : Events.PLAYER_LOAD_EVENT_CONFIG = {
      eventId : Events.EEventType.PLAYER_LOAD_EVENT,
      data : {
        ship : ship
      }
    }

    return packet;
  }
  console.log('a user connected');
  let playerId = nextPlayerId++;
  let shipId = nextGameObjectId++;

  let newPlayer : DataObjects.Player = createNewPlayer(playerId, shipId, socket);
  PLAYERS.set(playerId, newPlayer);
  SHIPS.set(shipId, newPlayer.ship);
  //@ts-ignore
  socket.emit('ServerEvent', createPlayerLoadEventPacket(PLAYERS.get(playerId).ship));

  socket.on('disconnect', function () {
    console.log('user disconnected');
    SHIPS.delete(shipId);
    PLAYERS.delete(playerId);
    sendPlayerDisconnected(shipId);
  });

  socket.on('ClientEvent', function(event : Events.GameEvent){
    //@ts-ignore
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
  SHIPS.forEach((ship: DataObjects.Ship, key: number) => {
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
  function createShipsUpdatePacket() {
    let shipArray: Array<DataObjects.Ship> = [];
    PLAYERS.forEach((player: DataObjects.Player, key: number) => {
      shipArray.push(player.ship);
    });

    let packet : Events.SHIPS_UPDATE_EVENT_CONFIG = {
      eventId : Events.EEventType.SHIPS_UPDATE_EVENT,
      data : {
        ships : shipArray
      }
    }
    
    return packet;
  }
  let packet : any = createShipsUpdatePacket()
  PLAYERS.forEach((player: DataObjects.Player, key: number) => {
    player.socket.emit('ServerEvent', packet)
  });
}

function sendPlayerDisconnected(disconnectedShipId : number) {
  function createPlayerDisconnectedPacket() {
    return {shipId : disconnectedShipId};
  }
  let packet : any = createPlayerDisconnectedPacket()
  PLAYERS.forEach((player: DataObjects.Player, key: number) => {
    player.socket.emit('ServerEvent', {type: Events.EEventType.PLAYER_DISCONNECTED_EVENT, data: packet})
  });
}

function handleClientEvent(player : DataObjects.Player, event : Events.GameEvent) {
   switch(event.eventId)  {
     case Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT : {
       onPlayerSetNewDestinationEvent(player, event);
       break;
     }
     default: {
       break;
     }
   }
}

function createNewPlayer(playerId : number, shipId : number, socket : any) {
  let ship : DataObjects.Ship = {
    id: shipId,
    x : 0,
    y : 0,
    speed: 2,
    isMoving : false,
    destinationX : 0,
    destinationY : 0
  }
  
  let newPlayer : DataObjects.Player = {
    socket : socket,
    ship : ship
  }

  return newPlayer;
}

//Server event functions
function onPlayerSetNewDestinationEvent(player : DataObjects.Player, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
  let xLength = player.ship.x - event.data.destinationX;
  let yLength = player.ship.y - event.data.destinationY;
  let length = Math.sqrt(xLength * xLength + yLength * yLength);
  if(length != 0) {
    player.ship.isMoving = true;
    player.ship.destinationX = event.data.destinationX;
    player.ship.destinationY = event.data.destinationY;
  } 
}