import { EEventType } from "./EEventType"

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
let SHIPS : { [key:number]: Object} = {};
let PLAYERS : { [key:number]: any} = {};

let nextPlayerId = 0;
let nextGameObjectId = 0;

//@ts-ignore
io.on('connection', function (socket) {

  console.log('a user connected');
  let playerId = nextPlayerId++;
  let shipId = nextGameObjectId++;

  createNewPlayer(playerId, shipId, socket);

  socket.emit('ServerEvent', {type: EEventType.PLAYER_LOAD_EVENT, 
    data: {
      ship : PLAYERS[playerId].ship
    }
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    delete SHIPS[shipId];
    delete PLAYERS[playerId];
  });

  socket.on('ClientEvent', function(event : any){
    handleClientEvent(PLAYERS[playerId], event);
  });
});

//Server functions
function handleClientEvent(player : any, event : any) {
   console.log("---ClientEvent---");
   console.log(event);

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
    isMoving : false,
    destinationX : 0,
    destinationY : 0
  }
  
  let newPlayer : Object = {
    socket : socket,
    ship : ship
  }

  PLAYERS[playerId] = newPlayer;
  SHIPS[shipId] = ship;
}

//Server event functions
function onPlayerSetNewDestinationEvent(player : any, x : number, y : number) {
  player.ship.isMoving = true;
  player.ship.destinationX = x;
  player.ship.destinationY = y;
}