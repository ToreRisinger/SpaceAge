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
import { Server } from "./Server";
import { SCharacter } from "./objects/SCharacter";
import { SClient } from "./objects/SClient";
import { SShip } from "./objects/SShip";

export class ComManager {

    //TODO move all sending to players here from Sector.
    //Sector should only handle game logic

    private io: any;
    private sectorHandler: SectorHandler;

    private clientMap: Map<number, SClient>; 

    constructor(ioServer: any, sectorHandler: SectorHandler) {
        this.clientMap = new Map<number, SClient>();
        this.sectorHandler = sectorHandler;
        
        ioServer.listen(8081, function () {
            Logger.info(`Listening on ${ioServer.address().port}`);
        });
  
        this.io = require('socket.io').listen(ioServer);

        this.setupOnConnection();
    }

    public update40ms() {
        
    }

    public update1000ms() {
        
    } 

    public update1min() {
        this.getClients().forEach(client => {
                let packet : any = PacketFactory.createSkillStatePacket(client);
                client.getData().socket.emit("ServerEvent", packet);
            }
        );
    }

    public getClients() : Array<SClient> {
        return Array.from(this.clientMap.values());
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
            Database.getUser(event.data.username, (err: any, users: Array<IUserDocument>) => {
                if(users.length > 0) {
                    this.onClientLogin(socket, users[0]);
                } else {
                    Database.newUser(event.data.username, (err: any, user: IUserDocument) => {
                        if(err) {
                            this.connectionError(err, socket);
                            return;
                        }
                        if(user) {
                            let newCharacter : SCharacter = SCharacter.createNewCharacter(user, this.sectorHandler.getLocation());
                            Database.writeNewCharacter(newCharacter, user, (err: any) => {
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

            let characterData : ICharacter | undefined = undefined;
            for(let i = 0; i < characters.length; i++) {
                if(characters[i].character.name == event.data.character.name) {
                    characterData = characters[i].character;
                }
            }

            if(characterData == undefined) {
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

            let character : SCharacter = SCharacter.createCharacter(characterData);
            let client : SClient = new SClient(socket, character);

            let packet : Events.SERVER_JOIN_ACK = {
                eventId : Events.EEventType.SERVER_JOIN_ACK,
                data : {
                    character: character.getData(),
                    clientSectorId : sector.getId(),
                    sectors : sectorArray
                }
            }

            this.clientMap.set(client.getData().id, client);
            this.sectorHandler.addClientToSector(client, 0, 0);

            socket.on('ClientEvent', (event : Events.GameEvent) => {
                this.onClientEvent(client, event);
            });
            socket.on('disconnect', () => {
                this.onDisconnect(client, user);
            });
            socket.emit("ServerEvent", packet); 
            this.sendServerMessage(client, "Welcome to SpaceAge!");
        }  
    }

    private onClientDisconnect() {
        Logger.info("User disconnected");
    }
  
    private onDisconnect(client: SClient, user: IUserDocument) {
        Logger.info("User disconnected with character '" + client.getData().character.name + "' of user '" + user.username + "'.");
        this.sectorHandler.removePlayerFromSector(client);
        Database.writeCharacter(client.getCharacter(), user, (err: string) => {
            if(err) {
                Logger.error("Could not write character '" + client.getData().character.name + "' of user '" + user.username + "'.");
            }
        });
    }
  
    private onClientEvent(client: SClient, event: Events.GameEvent) {
        this.handleClientEvent(client, event);
    }
  
    private handleClientEvent(client : SClient, event : Events.GameEvent) {
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
          case Events.EEventType.TRAIN_SKILL_START : {
            Server.getSkillManager().startTrainSkill(client, event);
            break;
          }
          case Events.EEventType.TRAIN_SKILL_STOP : {
            Server.getSkillManager().stopTrainSkill(client);
            break;
          }
          default: {
            break;
          }
        }
    }
  
    private onPlayerStartAttackingEvent(client: SClient, event : Events.PLAYER_START_ATTACKING_EVENT_CONFIG) {
        client.getCharacter().getShip().startAttack(event.data.targetId);
    }
  
    private onPlayerStopAttackingEvent(client: SClient, event : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG) {
        client.getCharacter().getShip().stopAttack();
    }
  
    private onPlayerStartMiningEvent(client: SClient, event : Events.PLAYER_START_MINING_EVENT_CONFIG) {
        client.getCharacter().getShip().startMining(event.data.targetId);
    }
  
    private onPlayerStopMiningEvent(client: SClient, event : Events.PLAYER_STOP_MINING_EVENT_CONFIG) {
        client.getCharacter().getShip().stopMining();
    }
  
    private onPlayerSetNewDestinationEvent(client : SClient, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
        client.getCharacter().getShip().newDestination(event.data.destinationX, event.data.destinationY);
    }
  
    private onPlayerStopShipEvent(client : SClient, event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG) {
        client.getCharacter().getShip().stopMove();
    }
  
    private onPlayerStartWarpEvent(client : SClient, event : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG) {
        //TODO, add check if they should be able to warp
        let sector = this.sectorHandler.getSectors().find(sector => sector.getId() == event.data.targetId);
        if(sector != undefined && ! client.getCharacter().getShip().getData().isWarping) {
            client.getCharacter().getShip().startWarp(sector);
            this.sectorHandler.onPlayerStartWarping(client, sector);
        }
    }
  
    private onChatMessageEvent(client : SClient, event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG) {
        this.broadcastChatMessage(client, event.data.message, event.data.sender);
    }
  
    private broadcastChatMessage(client : SClient, message : String, sender : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : sender
          }
        }
        client.getData().socket.broadcast.emit("ServerEvent", packet);  
    }
  
    private sendServerMessage(client : SClient, message : String) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : "Server"
          }
        }
        client.getData().socket.emit("ServerEvent", packet);  
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