import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Events } from "../shared/scripts/Events";
import { Database } from "./Database";
import { PacketFactory } from "./PacketFactory"

const math = require('mathjs');

math.length = function vec2Length(vec2 : Array<number>) {
    return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
  };
  
export module Server {

    let io : any;
    /* Globals */
    let SHIPS = new Map<number, ObjectInterfaces.IShip>();
    let PLAYERS = new Map<number, ObjectInterfaces.IPlayer>();

    export function start(server : any) {
      server.listen(8081, function () {
          console.log(`Listening on ${server.address().port}`);
      });

      io = require('socket.io').listen(server);

      setupOnConnection();
      setupUpdateLoop();
    }

    function setupOnConnection() {
        //@ts-ignore
        io.on('connection', function (socket) {
          console.log('a user connected');
          let playerId = Database.getPlayerId("toreman"); //TODO get username from login screen
          let newPlayer : ObjectInterfaces.IPlayer = Database.getPlayer(playerId, socket);
          PLAYERS.set(playerId, newPlayer);
          SHIPS.set(newPlayer.ship.id, newPlayer.ship);
          //@ts-ignore
          socket.emit('ServerEvent', PacketFactory.createPlayerLoadEventPacket(PLAYERS.get(playerId).ship));
      
          socket.on('disconnect', function () {
            console.log('user disconnected');
            SHIPS.delete(newPlayer.ship.id);
            PLAYERS.delete(playerId);
            sendPlayerDisconnected(newPlayer.ship.id);
          });
      
          socket.on('ClientEvent', function(event : Events.GameEvent){
            //@ts-ignore
            handleClientEvent(PLAYERS.get(playerId), event);
          });
        });
    }

    function setupUpdateLoop() {
        setInterval(update, 1000/25);
    }

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
              let divider = lengthOfBadVelVecCompSquared4;
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
        
        SHIPS.forEach((ship: ObjectInterfaces.IShip, key: number) => {
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
            let newVelVec =  calculateNewVelocityVector(shipToDestVec, ship.velVec, goodVelVecComp, badVelVecComp, ship.acceleration);
            let newVelVecLength = math.length(newVelVec);

            let shipMaxSpeed = ship.stats[ObjectInterfaces.ShipStatTypeEnum.max_speed];
            if(newVelVecLength > shipMaxSpeed) {
              ship.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
            } else {
              ship.velVec = newVelVec;
            }

           
            ship.x = ship.x + ship.velVec[0];
            ship.y = ship.y + ship.velVec[1];
          }
        });
    }

    function sendGameObjectUpdate() {
      let packet : any = PacketFactory.createShipsUpdatePacket(PLAYERS);
      PLAYERS.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
        player.socket.emit("ServerEvent", packet);
      });
    }

    function sendPlayerDisconnected(disconnectedShipId : number) {
      let packet : any = PacketFactory.createPlayerDisconnectedPacket(disconnectedShipId);
      PLAYERS.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
        player.socket.emit('ServerEvent', packet)
      });
    }

    function handleClientEvent(player : ObjectInterfaces.IPlayer, event : Events.GameEvent) {
      switch(event.eventId)  {
        case Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT : {
          onPlayerSetNewDestinationEvent(player, event);
          break;
        }
        case Events.EEventType.CHAT_MESSAGE_EVENT : {
          onChatMessageEvent(player, event);
          break;
        }
        default: {
          break;
        }
      }
    }

    //Server event functions
    function onPlayerSetNewDestinationEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
      let xLength = player.ship.x - event.data.destinationX;
      let yLength = player.ship.y - event.data.destinationY;
      let length = Math.sqrt(xLength * xLength + yLength * yLength);
      if(length != 0) {
        player.ship.isMoving = true;
        player.ship.destinationX = event.data.destinationX;
        player.ship.destinationY = event.data.destinationY;
      } 
    }

    function onChatMessageEvent(player : ObjectInterfaces.IPlayer, event : Events.CHAT_MESSAGE_EVENT_CONFIG) {
      console.log(event.data.sender + ": " + event.data.message);
    }
}