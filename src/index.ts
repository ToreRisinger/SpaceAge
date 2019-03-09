import { Events } from "./shared/scripts/Events"
import { DataObjects } from "./shared/scripts/DataObjects";

const math = require('mathjs')
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

math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};

/* Globals */
let SHIPS = new Map<number, DataObjects.Ship>();
let PLAYERS = new Map<number, DataObjects.Player>();
let nextPlayerId = 0;
let nextGameObjectId = 0;

//@ts-ignore
io.on('connection', function (socket) {
  function createPlayerLoadEventPacket(ship : DataObjects.Ship) {
    let packet : Events.INITAL_GAME_LOAD_EVENT_CONFIG = {
      eventId : Events.EEventType.INITAL_GAME_LOAD_EVENT,
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
  function getMidPointVec(shipToDestVec :  Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
    function getDivider(goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
      if(math.length(badVelVecComp) != 0) {
        let lengthOfBadVelVecComp = math.length(badVelVecComp);
        let lengthOfBadVelVecCompSquared1 = lengthOfBadVelVecComp * lengthOfBadVelVecComp;
        let lengthOfBadVelVecCompSquared2 = lengthOfBadVelVecCompSquared1 * lengthOfBadVelVecCompSquared1;
        let lengthOfBadVelVecCompSquared3 = lengthOfBadVelVecCompSquared2 * lengthOfBadVelVecCompSquared2;
        let lengthOfBadVelVecCompSquared4 = lengthOfBadVelVecCompSquared3 * lengthOfBadVelVecCompSquared3;
        let divider = lengthOfBadVelVecCompSquared4 * 40;
        return math.length(goodVelVecComp) / (math.length(goodVelVecComp) + divider);
      } else {
        return 1;
      }
    }

    let divider = getDivider(goodVelVecComp, badVelVecComp);

    let midPointVec = math.multiply(shipToDestVec, divider);
    return  midPointVec;
  }
  function calculateNewVelocityVector(shipToDestVec : Array<number>, shipVelVec : Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>, shipAcceleration : number) {
    let newVelVec = [0, 0];

    let midPoint = getMidPointVec(shipToDestVec, goodVelVecComp, badVelVecComp);
    let nrOfUpdatesUntilReachDestination = math.multiply(math.length(shipToDestVec), 1/math.length(goodVelVecComp));
    let nrOfStepsNeededToDecelerate = math.multiply(math.length(goodVelVecComp), 1/shipAcceleration)
    if(nrOfUpdatesUntilReachDestination < nrOfStepsNeededToDecelerate) {
      midPoint = [0, 0];
    }

    let velVecToMidPoint = math.subtract(midPoint, shipVelVec);
    let normalizedVelVecToMidPoint = math.multiply(velVecToMidPoint, 1/math.length(velVecToMidPoint));
    let directionVecAdjustmentVec = math.multiply(normalizedVelVecToMidPoint, shipAcceleration);
    newVelVec = math.add(shipVelVec, directionVecAdjustmentVec);

    return newVelVec;
  }


  SHIPS.forEach((ship: DataObjects.Ship, key: number) => {
    let destVec = [ship.destinationX, ship.destinationY];
    let shipPosVec = [ship.x, ship.y];
    let shipToDestVec = math.subtract(destVec, shipPosVec);
    let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
    let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(ship.velVec, normalizedShipToDestVec));
    let badVelVecComp = math.subtract(ship.velVec, goodVelVecComp);
    
    if(math.length(shipToDestVec) < 1 && math.length(goodVelVecComp) < 1) {
      ship.isMoving = false;
      ship.x = ship.destinationX;
      ship.y = ship.destinationY;
    }
     
    if(ship.isMoving) {
      ship.velVec = calculateNewVelocityVector(shipToDestVec, ship.velVec, goodVelVecComp, badVelVecComp, ship.acceleration);
      ship.x = ship.x + ship.velVec[0];
      ship.y = ship.y + ship.velVec[1];
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
    player.socket.emit("ServerEvent", packet);
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
    destinationY : 0,
    acceleration : 0.1,
    velVec : [0, 0],
    maxSpeed : 10
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