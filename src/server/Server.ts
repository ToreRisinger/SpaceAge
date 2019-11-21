import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Events } from "../shared/scripts/Events";
import { Database } from "./Database";
import { PacketFactory } from "./PacketFactory"
import { SectorHandler } from "./SectorHandler";

const math = require('mathjs');

math.length = function vec2Length(vec2 : Array<number>) {
    return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};
  
export module Server {

    let io : any;
    /* Globals */

    let UPDATES_PER_SECOND : number = 25;

    let sectorHandler : SectorHandler;

    export function start(server : any) {
      sectorHandler = new SectorHandler();
      
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
          let newPlayer : ObjectInterfaces.IPlayer = Database.getPlayer(Database.getPlayerId("toreman"), socket);
          let playerShipSector = Database.getPlayerShipLocation(newPlayer.playerId);
          console.log('a user connected: ' + newPlayer.ship.id);

          sectorHandler.addPlayerToSector(newPlayer, playerShipSector.sector_x, playerShipSector.sector_y);

          socket.emit('ServerEvent', PacketFactory.createPlayerLoadEventPacket(newPlayer));
          sendServerMessage(newPlayer, "Welcome to SpaceAge!");

          socket.on('disconnect', function () {
            console.log('user disconnected: ' + newPlayer.ship.id);
            sectorHandler.removePlayerFromSector(newPlayer);
          });
      
          socket.on('ClientEvent', function(event : Events.GameEvent){
            handleClientEvent(newPlayer, event);
          });
        });
    }

    function setupGameLoops() {
      setInterval(update40ms, 1000/UPDATES_PER_SECOND);
      setInterval(update1000ms, 1000);
    }

    //Server functions
    function update40ms() {
      sectorHandler.update40ms();
    }

    function update1000ms() {
      sectorHandler.update1000ms();
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
        case Events.EEventType.PLAYER_START_MINING_EVENT : {
          onPlayerStartMiningEvent(player, event);
          break;
        }
        case Events.EEventType.PLAYER_STOP_MINING_EVENT : {
          onPlayerStopMiningEvent(player, event);
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

    function onPlayerStartMiningEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_START_MINING_EVENT_CONFIG) {
      if(event.data.targetId != undefined && event.data.targetId > 0) {
        startMining(player.ship, event.data.targetId);
      }
    }

    function onPlayerStopMiningEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_MINING_EVENT_CONFIG) {
      stopMining(player.ship);
    }

    function stopAttacking(ship : ObjectInterfaces.IShip) {
      ship.isAttacking = false;
      //ship.targetId = -1;
    }

    function startAttacking(ship : ObjectInterfaces.IShip, targetId : number) {
      ship.isAttacking = true;
      ship.targetId = targetId;
    }

    function stopMining(ship : ObjectInterfaces.IShip) {
      ship.isMining = false;
      //ship.targetId = -1;
    }

    function startMining(ship : ObjectInterfaces.IShip, targetId : number) {
      ship.isMining = true;
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