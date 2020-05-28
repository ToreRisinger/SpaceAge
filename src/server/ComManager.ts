import { SectorHandler } from "./SectorHandler";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Database } from "./database/Database";
import { PacketFactory } from "./PacketFactory";
import { Events } from "../shared/scripts/Events";

export class ComManager {

    //TODO move all sending to players here from Sector.
    //Sector should only handle game logic

    private io: any;
    private server: any;
    private sectorHandler: SectorHandler;

    constructor(server: any, sectorHandler: SectorHandler) {
        this.sectorHandler = sectorHandler;
        this.server = server;
        
        this.server.listen(8081, function () {
            console.log(`Listening on ${server.address().port}`);
        });
  
        this.io = require('socket.io').listen(server);

        this.setupOnConnection();
    }

    public update40ms() {
        
    }

    public update1000ms() {
        
    } 

    private setupOnConnection() {
        this.io.on('connection', (socket: any) => {
            this.onConnection(socket);
        });
    }
  
    //@ts-ignore
    private onConnection(socket) {
        let newPlayer : ObjectInterfaces.IPlayer = Database.getPlayer(Database.getPlayerId("toreman"), socket);
        let playerShipSector = Database.getPlayerShipLocation(newPlayer.playerId);
        console.log('a user connected: ' + newPlayer.ship.id);
  
        this.sectorHandler.addPlayerToSector(newPlayer, playerShipSector.sector_x, playerShipSector.sector_y);
        let sector = this.sectorHandler.getSectorOfPlayer(newPlayer);
        //@ts-ignore
        let sectorId = sector.getId();
        
        this.sendLoadEvent(newPlayer, sectorId);
        this.sendServerMessage(newPlayer, "Welcome to SpaceAge!");
  
        socket.on('disconnect', () => {
            this.onDisconnect(newPlayer);
        });
    
        socket.on('ClientEvent', (event : Events.GameEvent) => {
            this.onClientEvent(newPlayer, event);
        });
    }
  
    private onDisconnect(player: ObjectInterfaces.IPlayer) {
        console.log('user disconnected: ' + player.ship.id);
        this.sectorHandler.removePlayerFromSector(player);
    }
  
    private onClientEvent(player: ObjectInterfaces.IPlayer, event: Events.GameEvent) {
        this.handleClientEvent(player, event);
    }
  
    private handleClientEvent(player : ObjectInterfaces.IPlayer, event : Events.GameEvent) {
        switch(event.eventId)  {
          case Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT : {
            this.onPlayerSetNewDestinationEvent(player, event);
            break;
          }
          case Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT : {
            this.onChatMessageEvent(player, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_SHIP_EVENT : {
            this.onPlayerStopShipEvent(player, event);
            break;
          }
          case Events.EEventType.PLAYER_START_ATTACKING_EVENT : {
            this.onPlayerStartAttackingEvent(player, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_ATTACKING_EVENT : {
            this.onPlayerStopAttackingEvent(player, event);
          }
          case Events.EEventType.PLAYER_START_MINING_EVENT : {
            this.onPlayerStartMiningEvent(player, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_MINING_EVENT : {
            this.onPlayerStopMiningEvent(player, event);
            break;
          }
          case Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT : {
            this.onPlayerStartWarpEvent(player, event);
            break;
          }
          default: {
            break;
          }
        }
    }
  
    private onPlayerStartAttackingEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_START_ATTACKING_EVENT_CONFIG) {
        if(event.data.targetId != undefined && event.data.targetId > 0) {
            this.startAttacking(player.ship, event.data.targetId);
        }
    }
  
    private onPlayerStopAttackingEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG) {
        this.stopAttacking(player.ship);
    }
  
    private onPlayerStartMiningEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_START_MINING_EVENT_CONFIG) {
        if(event.data.targetId != undefined && event.data.targetId > 0) {
            this.startMining(player.ship, event.data.targetId);
        }
    }
  
    private onPlayerStopMiningEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_MINING_EVENT_CONFIG) {
        this.stopMining(player.ship);
    }
  
    private stopAttacking(ship : ObjectInterfaces.IShip) {
        ship.isAttacking = false;
    }
  
    private startAttacking(ship : ObjectInterfaces.IShip, targetId : number) {
        ship.isAttacking = true;
        ship.targetId = targetId;
    }
  
    private stopMining(ship : ObjectInterfaces.IShip) {
        ship.isMining = false;
        //ship.targetId = -1;
    }
  
    private startMining(ship : ObjectInterfaces.IShip, targetId : number) {
        ship.isMining = true;
        ship.targetId = targetId;
    }
  
    private onPlayerSetNewDestinationEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
        let xLength = player.ship.x - event.data.destinationX;
        let yLength = player.ship.y - event.data.destinationY;
        let length = Math.sqrt(xLength * xLength + yLength * yLength);
        if(length != 0) {
          player.ship.isMoving = true;
          player.ship.destVec = [event.data.destinationX, event.data.destinationY];
          player.ship.hasDestination = true;
        } 
    }
  
    private onPlayerStopShipEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG) {
        player.ship.hasDestination = false;
    }
  
    private onPlayerStartWarpEvent(player : ObjectInterfaces.IPlayer, event : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG) {
        //TODO, add check if they should be able to warp
        let sector = this.sectorHandler.getSectors().find(sector => sector.getId() == event.data.targetId);
        if(sector != undefined && !player.ship.isWarping) {
          player.ship.isWarping = true;
          player.ship.warpDestination = [sector.getX(), sector.getY()];
          player.ship.warpSource  = [player.ship.x, player.ship.y];
          player.ship.hasDestination = false;
          this.sectorHandler.onPlayerStartWarping(player, sector);
        }
    }
  
    private onChatMessageEvent(player : ObjectInterfaces.IPlayer, event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG) {
        this.broadcastChatMessage(player, event.data.message, event.data.sender);
    }
  
    private broadcastChatMessage(player : ObjectInterfaces.IPlayer, message : String, sender : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : sender
          }
        }
        player.socket.broadcast.emit("ServerEvent", packet);  
    }
  
    private sendServerMessage(player : ObjectInterfaces.IPlayer, message : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : "Server"
          }
        }
        player.socket.emit("ServerEvent", packet);  
    }
  
    private sendLoadEvent(player : ObjectInterfaces.IPlayer, sectorId: number) {
        player.socket.emit('ServerEvent', PacketFactory.createPlayerLoadEventPacket(player, this.sectorHandler.getSectors(), sectorId));
    }
}