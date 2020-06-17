import { Server } from "./server/Server";

const express = require('express');
const app = express();
const http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));

 //@ts-ignore
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
Server.start(http);














