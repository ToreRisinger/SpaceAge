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

    let UPDATES_PER_SECOND : number = 25;

    export function start(server : any) {
      server.listen(8081, function () {
          console.log(`Listening on ${server.address().port}`);
      });

      io = require('socket.io').listen(server);

      setupOnConnection();
      setupGameLoops();
    }

    function setupOnConnection() {
        //@ts-ignore
        io.on('connection', function (socket) {
          let playerId = Database.getPlayerId("toreman"); //TODO get username from login screen
          let newPlayer : ObjectInterfaces.IPlayer = Database.getPlayer(playerId, socket);
          console.log('a user connected: ' + newPlayer.ship.id);
          PLAYERS.set(playerId, newPlayer);
          SHIPS.set(newPlayer.ship.id, newPlayer.ship);
          //@ts-ignore
          socket.emit('ServerEvent', PacketFactory.createPlayerLoadEventPacket(PLAYERS.get(playerId).ship));
          //@ts-ignore
          sendServerMessage(PLAYERS.get(playerId), "Welcome to SpaceAge!");

          socket.on('disconnect', function () {
            console.log('user disconnected: ' + newPlayer.ship.id);
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

    function setupGameLoops() {
      setInterval(update40ms, 1000/UPDATES_PER_SECOND);
      setInterval(update1000ms, 1000);
    }

    //Server functions
    function update40ms() {
      updateShipPositions();
      sendGameObjectUpdate();
    }

    function update1000ms() {
      SHIPS.forEach((ship: ObjectInterfaces.IShip, key: number) => {
        if(ship.isAttacking) {
          handleAttackingShip(ship);
        }
        /*

        TODO mining
        if(ship.isMining) {
          handleMiningShip(ship);
        }

        TODO check if any ship died
        handleDestroyedShip(ship);
        */

      });
    }

    function handleAttackingShip(attackingShip : ObjectInterfaces.IShip) {
      let targetShip = SHIPS.get(attackingShip.targetId);
      if(targetShip != undefined) {
        let attackingShipPos = [attackingShip.x, attackingShip.y];
        let targetShipPos = [targetShip.x, targetShip.y];
        let attackingShipToTargetShipVec = math.subtract(attackingShipPos, targetShipPos);
        let attackingShipToTargetShipDistance : number = math.length(attackingShipToTargetShipVec);
        let attackingShipWeaponRange = attackingShip.stats[ObjectInterfaces.ShipStatTypeEnum.weapon_range];
        if(attackingShipToTargetShipDistance <= attackingShipWeaponRange) {
          dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.ShipStatTypeEnum.normal_dps], ObjectInterfaces.EDamageType.NORMAL_DAMAGE);
          dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.ShipStatTypeEnum.explosive_dps], ObjectInterfaces.EDamageType.EXPLOSIVE_DAMAGE);
          dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.ShipStatTypeEnum.heat_dps], ObjectInterfaces.EDamageType.HEAT_DAMAGE);
          dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.ShipStatTypeEnum.impact_dps], ObjectInterfaces.EDamageType.IMPACT_DAMAGE);
        } 
      }
    }

    function dealDamageToShip(ship : ObjectInterfaces.IShip, damage : number, damageType : ObjectInterfaces.EDamageType) {
      let damageLeft = damage;
      let shield = ship.properties.currentShield;
      let armor = ship.properties.currentArmor;
      let hull = ship.properties.currentHull;

      //Damage to shield
      if(shield - damageLeft < 0) {
        damageLeft -= shield;
        ship.properties.currentShield = 0;
      } else {
        ship.properties.currentShield -= damageLeft;
        return;
      }

      //Damage to armor
      let damageTypeResistPercent = getDamageTypeResist(ship, damageType);
      let armorDamageAfterResist = math.floor(damageLeft * damageTypeResistPercent);
      if(armor - armorDamageAfterResist < 0) {
        damageLeft -= math.floor(armor / damageTypeResistPercent);
        ship.properties.currentArmor = 0;
      } else {
        ship.properties.currentArmor -= armorDamageAfterResist;
        return;
      }

      //Damage to hull
      if(hull - damageLeft < 0) {
        ship.properties.currentHull = 0;
      } else {
        ship.properties.currentHull -= damageLeft;
      }
    }

    function getDamageTypeResist(ship : ObjectInterfaces.IShip, damageType : ObjectInterfaces.EDamageType) : number {
      let resist : number = 0;
      switch(damageType) {
        case ObjectInterfaces.EDamageType.NORMAL_DAMAGE :
          resist = 1;
          break;
        case ObjectInterfaces.EDamageType.EXPLOSIVE_DAMAGE :
          resist = 1 - ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance] / 100;
          break;
        case ObjectInterfaces.EDamageType.HEAT_DAMAGE :
          resist = 1 - ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance] / 100;
          break;
        case ObjectInterfaces.EDamageType.IMPACT_DAMAGE :
          resist = 1 - ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance] / 100;
          break;  
      }
      return resist;
    }



    function updateShipPositions() {
        function getMidPointVec(shipToDestVec :  Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
          function getDivider(goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
            if(math.length(badVelVecComp) != 0) {
              let lengthOfBadVelVecComp = math.length(badVelVecComp);
              let lengthOfBadVelVecCompSquared1 = lengthOfBadVelVecComp * lengthOfBadVelVecComp;
              //let lengthOfBadVelVecCompSquared2 = lengthOfBadVelVecCompSquared1 * lengthOfBadVelVecCompSquared1;
              //let lengthOfBadVelVecCompSquared3 = lengthOfBadVelVecCompSquared2 * lengthOfBadVelVecCompSquared2;
              //let lengthOfBadVelVecCompSquared4 = lengthOfBadVelVecCompSquared3 * lengthOfBadVelVecCompSquared3;
              let divider = lengthOfBadVelVecCompSquared1;
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
          if(nrOfUpdatesUntilReachDestination <= nrOfStepsNeededToDecelerate) {
            midPoint = [0.5, 0.5];
          }
      
          let velVecToMidPoint = math.subtract(midPoint, shipVelVec);
          let normalizedVelVecToMidPoint = math.multiply(velVecToMidPoint, 1/math.length(velVecToMidPoint));
          let directionVecAdjustmentVec = math.multiply(normalizedVelVecToMidPoint, shipAcceleration  / UPDATES_PER_SECOND);
          newVelVec = math.add(shipVelVec, directionVecAdjustmentVec);
      
          return newVelVec;
        }
        
        SHIPS.forEach((ship: ObjectInterfaces.IShip, key: number) => {
          let shipAcceleration = ship.stats[ObjectInterfaces.ShipStatTypeEnum.acceleration];
          let destVec = ship.destVec;
          let shipPosVec = [ship.x, ship.y];
          let shipToDestVec = math.subtract(destVec, shipPosVec);
          let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
          let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(ship.velVec, normalizedShipToDestVec));
          let badVelVecComp = math.subtract(ship.velVec, goodVelVecComp);
          
          if(ship.hasDestination) {
            if(math.length(shipToDestVec) <= shipAcceleration / UPDATES_PER_SECOND && math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
              ship.isMoving = false;
              ship.x = ship.destVec[0];
              ship.y = ship.destVec[1];
              ship.hasDestination = false;
            }
          } else {
            if(math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
              ship.isMoving = false;
            }
          }
           
          if(ship.isMoving) {
            let newVelVec = ship.hasDestination 
              ? calculateNewVelocityVector(shipToDestVec, ship.velVec, goodVelVecComp, badVelVecComp, shipAcceleration)
              : math.subtract(ship.velVec, math.multiply(ship.velVec, (shipAcceleration/UPDATES_PER_SECOND)/math.length(ship.velVec)));

            let newVelVecLength = math.length(newVelVec);

            let shipMaxSpeed = ship.stats[ObjectInterfaces.ShipStatTypeEnum.max_speed];
            if(newVelVecLength > shipMaxSpeed) {
              ship.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
            } else {
              ship.velVec = newVelVec;
            }

            ship.x = ship.x + ship.velVec[0] / UPDATES_PER_SECOND;
            ship.y = ship.y + ship.velVec[1] / UPDATES_PER_SECOND;
            ship.meters_per_second = math.length(ship.velVec);
          } else {
            ship.meters_per_second = 0;
            ship.velVec = [0, 0];
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
        case Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT : {
          onChatMessageEvent(player, event);
          break;
        }
        case Events.EEventType.PLAYER_STOP_SHIP_EVENT : {
          onPlayerStopShipEvent(player, event);
          break;
        }
        case Events.EEventType.PLAYER_START_ATTACKING_EVENT : {
          onPlayerStartAttackingEvent(player, event);
          break;
        }
        case Events.EEventType.PLAYER_STOP_ATTACKING_EVENT : {
          onPlayerStopAttackingEvent(player, event);
        }
        default: {
          break;
        }
      }
    }

    function onPlayerStartAttackingEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_START_ATTACKING_EVENT_CONFIG) {
        if(event.data.targetId != undefined && event.data.targetId > 0) {
          startAttacking(player.ship, event.data.targetId);
        }
    }

    function onPlayerStopAttackingEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG) {
      stopAttacking(player.ship);
    }

    function stopAttacking(ship : ObjectInterfaces.IShip) {
      ship.isAttacking = false;
      ship.targetId = -1;
    }

    function startAttacking(ship : ObjectInterfaces.IShip, targetId : number) {
      ship.isAttacking = true;
      ship.targetId = targetId;
    }
    //Server event functions
    function onPlayerSetNewDestinationEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
      let xLength = player.ship.x - event.data.destinationX;
      let yLength = player.ship.y - event.data.destinationY;
      let length = Math.sqrt(xLength * xLength + yLength * yLength);
      if(length != 0) {
        player.ship.isMoving = true;
        player.ship.destVec = [event.data.destinationX, event.data.destinationY];
        player.ship.hasDestination = true;
      } 
    }

    function onPlayerStopShipEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG) {
      player.ship.hasDestination = false;
    }

    function onChatMessageEvent(player : ObjectInterfaces.IPlayer, event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG) {
      broadcastChatMessage(player, event.data.message, event.data.sender);
    }

    function broadcastChatMessage(player : ObjectInterfaces.IPlayer, message : String, sender : String) {
      let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
        eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
        data : {
          message : message,
          sender : sender
        }
      }
      player.socket.broadcast.emit("ServerEvent", packet);  
    }

    function sendServerMessage(player : ObjectInterfaces.IPlayer, message : String) {
      let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
        eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
        data : {
          message : message,
          sender : "Server"
        }
      }
      player.socket.emit("ServerEvent", packet);  
    }
}