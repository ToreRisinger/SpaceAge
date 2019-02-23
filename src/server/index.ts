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

let players : { [key:number]: Object} = {};

//@ts-ignore
io.on('connection', function (socket) {
  console.log('a user connected');
  let playerId = loadPlayerId();
  let player : any = loadPlayer(playerId);
  players[playerId] = player;
  socket.emit('ServerEvent', {type: EEventType.PLAYER_LOAD_EVENT, data: player});

  socket.on('disconnect', function () {
    console.log('user disconnected');
    delete players[playerId];
  });

  socket.on('ClientEvent', function(data : any){
    handleClientEvent(player, data);
  });
});

//TODO this shall take login credentials and return id from database
function loadPlayerId() {
  let min = 0;
  let max = 10000000000;
  return Math.floor(Math.random()*(max-min+1)+min);
}

//TODO this shall take player id and return player object from database
function loadPlayer(id : number) {
  return {x: 0, y: 0};
}

function handleClientEvent(player : any, eventData : any) {
  console.log("handleClientEvent");
}