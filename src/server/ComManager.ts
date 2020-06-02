import { SectorHandler } from "./SectorHandler";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Database } from "./database/Database";
import { PacketFactory } from "./PacketFactory";
import { Events } from "../shared/scripts/Events";
import { IUserDocument } from "./database/models/user.model";
import { Logger } from "../shared/logger/Logger";
import { ICharacterDocument } from "./database/models/character.model";
import { ICharacter } from "../shared/interfaces/ICharacter";
import { Sector } from "./Sector";
import { IClient } from "./interfaces/IClient";
import { IdHandler } from "./IdHandler";
import { ISector } from "../shared/interfaces/ISector";

export class ComManager {

    //TODO move all sending to players here from Sector.
    //Sector should only handle game logic

    private io: any;
    private server: any;
    private sectorHandler: SectorHandler;

    private clientMap: Map<number, IClient>; 

    constructor(server: any, sectorHandler: SectorHandler) {
        this.clientMap = new Map<number, IClient>();
        this.sectorHandler = sectorHandler;
        this.server = server;
        
        this.server.listen(8081, function () {
            Logger.info(`Listening on ${server.address().port}`);
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

    private onConnection(socket: any) {
        Logger.info("User connected '" + socket.conn.remoteAddress + "'");
        socket.on('ClientEvent', (event : Events.GameEvent) => {
            this.onClientLoginReq(socket, event);
        });
        socket.on('disconnect', () => {
            this.onClientDisconnect();
        });
    }

    private onClientLoginReq(socket: any, event: Events.GameEvent) {
        if(event.eventId == Events.EEventType.CLIENT_LOGIN_REQ) {
            Database.getUser(event.data.username, (err: string, users: Array<IUserDocument>) => {
                if(users.length > 0) {
                    this.onClientLogin(socket, users[0]);
                } else {
                    Database.newUser(event.data.username, (err: string, user: IUserDocument) => {
                        if(err) {
                            this.connectionError(err, socket);
                            return;
                        }
            
                        if(user) {
                            Database.newCharacter(user, this.sectorHandler.getLocation(), (err: string, character: ICharacterDocument) => {
                                if(err) {
                                    this.connectionError(err, socket);
                                    return;
                                }
                                this.onClientLogin(socket, user);
                            });
                        } else {
                            this.connectionError(err, socket);
                            return;
                        }
                    });
                    
                }
            });
        }
    }

    private onClientLogin(socket: any, user: IUserDocument) {
        Logger.info("User '" + user.username + "' logged in");
        Database.getCharacters(user, (err: string, characters: Array<ICharacterDocument>) => {
            if(err) {
                this.connectionError(err, socket);
                return;
            }
            socket.on('ClientEvent', (event : Events.GameEvent) => {
                this.onClientJoinReq(socket, user, event, characters);
            });
            this.sendCharacters(socket, characters);
        })
    }

    private sendCharacters(socket: any, characters: Array<ICharacterDocument>) {
        let chars : Array<ICharacter> = [];
        characters.forEach(c => { chars.push(c.character) });
        let packet : Events.SERVER_LOGIN_ACK = {
            eventId : Events.EEventType.SERVER_LOGIN_ACK,
            data : {
              characters : chars
            }
        }
        socket.emit("ServerEvent", packet);  
    }

    private onClientJoinReq(socket: any, user: IUserDocument, event: Events.GameEvent, characters: Array<ICharacterDocument>) {
        if(event.eventId == Events.EEventType.CLIENT_JOIN_REQ) {

            Logger.info("User '" + user.username + "' joined with character '" + event.data.character.name + "'");

            let character : ICharacter | undefined = undefined;
            for(let i = 0; i < characters.length; i++) {
                if(characters[i].character.name == event.data.character.name) {
                    character = characters[i].character;
                }
            }

            if(character == undefined) {
                this.connectionError("Could not find character: '" + event.data.character.name + "'", socket);
                return;
            }
            
            let sectorArray : Array<ISector> = new Array();
            let sectors : Array<Sector> = this.sectorHandler.getSectors();
            for(let i = 0; i < sectors.length; i++) {
                sectorArray.push({
                    id : sectors[i].getId(),
                    x : sectors[i].getX(),
                    y : sectors[i].getY(),
                    name : sectors[i].getName()
                });
            }

            let sector : Sector | undefined = this.sectorHandler.getSector(0, 0);
            if(sector == undefined) {
                this.connectionError("Could not find sector", socket);
                return;
            }
        
            let packet : Events.SERVER_JOIN_ACK = {
                eventId : Events.EEventType.SERVER_JOIN_ACK,
                data : {
                    character: character,
                    clientSectorId : sector.getId(),
                    sectors : sectorArray
                }
            }
            
            let clientId = IdHandler.getNewPlayerId();
            let newClient : IClient = {
                character: character,
                socket: socket,
                id: clientId
            }

            newClient.character.ship.id = IdHandler.getNewGameObjectId();

            this.clientMap.set(clientId, newClient);
            this.sectorHandler.addClientToSector(newClient, 0, 0);

            socket.on('ClientEvent', (event : Events.GameEvent) => {
                this.onClientEvent(newClient, event);
            });
            socket.on('disconnect', () => {
                this.onDisconnect(newClient, user);
            });
            socket.emit("ServerEvent", packet); 
            this.sendServerMessage(newClient, "Welcome to SpaceAge!");
        }  
    }

    private onClientDisconnect() {
        Logger.info("User disconnected");
    }
  
    private onDisconnect(client: IClient, user: IUserDocument) {
        Logger.info("User disconnected with character '" + client.character.name + "' of user '" + user.username + "'.");
        this.sectorHandler.removePlayerFromSector(client);
        Database.writeCharacter(client.character, user, (err: string) => {
            if(err) {
                Logger.error("Could not write character '" + client.character.name + "' of user '" + user.username + "'.");
            }
        });
    }
  
    private onClientEvent(client: IClient, event: Events.GameEvent) {
        this.handleClientEvent(client, event);
    }
  
    private handleClientEvent(client : IClient, event : Events.GameEvent) {
        switch(event.eventId)  {
          case Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT : {
            this.onPlayerSetNewDestinationEvent(client, event);
            break;
          }
          case Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT : {
            this.onChatMessageEvent(client, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_SHIP_EVENT : {
            this.onPlayerStopShipEvent(client, event);
            break;
          }
          case Events.EEventType.PLAYER_START_ATTACKING_EVENT : {
            this.onPlayerStartAttackingEvent(client, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_ATTACKING_EVENT : {
            this.onPlayerStopAttackingEvent(client, event);
          }
          case Events.EEventType.PLAYER_START_MINING_EVENT : {
            this.onPlayerStartMiningEvent(client, event);
            break;
          }
          case Events.EEventType.PLAYER_STOP_MINING_EVENT : {
            this.onPlayerStopMiningEvent(client, event);
            break;
          }
          case Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT : {
            this.onPlayerStartWarpEvent(client, event);
            break;
          }
          default: {
            break;
          }
        }
    }
  
    private onPlayerStartAttackingEvent(client: IClient, event : Events.PLAYER_START_ATTACKING_EVENT_CONFIG) {
        if(event.data.targetId != undefined && event.data.targetId > 0) {
            this.startAttacking(client.character.ship, event.data.targetId);
        }
    }
  
    private onPlayerStopAttackingEvent(client: IClient, event : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG) {
        this.stopAttacking(client.character.ship);
    }
  
    private onPlayerStartMiningEvent(client: IClient, event : Events.PLAYER_START_MINING_EVENT_CONFIG) {
        if(event.data.targetId != undefined && event.data.targetId > 0) {
            this.startMining(client.character.ship, event.data.targetId);
        }
    }
  
    private onPlayerStopMiningEvent(client: IClient, event : Events.PLAYER_STOP_MINING_EVENT_CONFIG) {
        this.stopMining(client.character.ship);
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
    }
  
    private startMining(ship : ObjectInterfaces.IShip, targetId : number) {
        ship.isMining = true;
        ship.targetId = targetId;
    }
  
    private onPlayerSetNewDestinationEvent(client : IClient, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
        let xLength = client.character.ship.x - event.data.destinationX;
        let yLength = client.character.ship.y - event.data.destinationY;
        let length = Math.sqrt(xLength * xLength + yLength * yLength);
        if(length != 0) {
            client.character.ship.isMoving = true;
            client.character.ship.destVec = [event.data.destinationX, event.data.destinationY];
            client.character.ship.hasDestination = true;
        } 
    }
  
    private onPlayerStopShipEvent(client : IClient, event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG) {
        client.character.ship.hasDestination = false;
    }
  
    private onPlayerStartWarpEvent(client : IClient, event : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG) {
        //TODO, add check if they should be able to warp
        let sector = this.sectorHandler.getSectors().find(sector => sector.getId() == event.data.targetId);
        if(sector != undefined && !client.character.ship.isWarping) {
            client.character.ship.isWarping = true;
            client.character.ship.warpDestination = [sector.getX(), sector.getY()];
            client.character.ship.warpSource  = [client.character.ship.x, client.character.ship.y];
            client.character.ship.hasDestination = false;
            this.sectorHandler.onPlayerStartWarping(client, sector);
        }
    }
  
    private onChatMessageEvent(client : IClient, event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG) {
        this.broadcastChatMessage(client, event.data.message, event.data.sender);
    }
  
    private broadcastChatMessage(client : IClient, message : String, sender : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : sender
          }
        }
        client.socket.broadcast.emit("ServerEvent", packet);  
    }
  
    private sendServerMessage(client : IClient, message : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : "Server"
          }
        }
        client.socket.emit("ServerEvent", packet);  
    }

    private disconnectClient(socket: any) {
        socket.disconnect();
    }

    private connectionError(err: string, socket: any) {
        Logger.error(err);
        Logger.info("Disconnecting user.");
        this.disconnectClient(socket);
    }
}