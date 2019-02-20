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

//@ts-ignore
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});