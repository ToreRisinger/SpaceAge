import { SectorHandler } from "./sector/SectorHandler";
import { Database } from "./database/Database";
import { PacketFactory } from "./PacketFactory";
import { Events } from "../shared/util/Events";
import { IUserDocument } from "./database/models/user.model";
import { Logger } from "../shared/logger/Logger";
import { ICharacter } from "../shared/data/gameobject/ICharacter";
import { SSector } from "./sector/SSector";
import { SCharacter } from "./objects/SCharacter";
import { SClient } from "./objects/SClient";
import { ICombatLogMessage } from "../shared/data/CombatLogInterfaces";
import { ISector } from "../shared/data/sector/ISector";
import { SShip } from "./objects/SShip";
import { ConnectionConfiguration as ConnectionConfiguration } from "../shared/constants/connectionConfiguration";

export class ComManager {

    private io: any;
    private sectorHandler: SectorHandler;

    private clientMap: Map<number, SClient>; 
    private combatLogMessages: Array<{receiver: SClient, message: ICombatLogMessage}>;

    constructor(http: any, sectorHandler: SectorHandler) {
        this.clientMap = new Map<number, SClient>();
        this.combatLogMessages = new Array();
        this.sectorHandler = sectorHandler;
        
        
        http.listen(ConnectionConfiguration.serverPort, '0.0.0.0', function () {
            Logger.info(`Listening on ${http.address().port}`);
        });
        
        this.io = require('socket.io').listen(http, {'pingInterval': ConnectionConfiguration.pingIntervall, 'pingTimeout': ConnectionConfiguration.pingTimeout});

        this.setupOnConnection();
    }

    public update40ms() {
        this.sendCombatLogMessages();
    }

    public update1000ms() {
        this.getClients().forEach(client => {
                let packet : any = PacketFactory.createSkillStatePacket(client);
                client.getData().socket.emit("ServerEvent", packet);
            }
        );
    } 

    public update1min() {
        
    }

    public getClients() : Array<SClient> {
        return Array.from(this.clientMap.values());
    }

    private setupOnConnection() {
        this.io.on('connection', (socket: any) => {
            this.handleConnection(socket);
        });
    }

    private handleConnection(socket: any) {
        Logger.info(socket.conn.remoteAddress + "' connected.");
        socket.on('ClientEvent', (event : Events.GameEvent) => {
            this.handleClientLoginAndRegister(socket, event);
        });
        socket.on('disconnect', () => {
            this.handleDisconnect();
        });
    }

    private handleClientLoginAndRegister(socket: any, event: Events.GameEvent) {
        if(event.eventId == Events.EEventType.CLIENT_LOGIN_REQ) {
            Database.getUser(event.data.username, event.data.password, (error: Database.EDataBaseError, user: IUserDocument | undefined) => {
                switch(error) {
                    case Database.EDataBaseError.NO_ERROR:
                        //@ts-ignore
                        Logger.info("User '" + user.username + "' logged in");
                        this.onLoginSuccess(socket);
                        socket.on('ClientEvent', (event : Events.GameEvent) => {
                            //@ts-ignore
                            this.handleClientCharacterSelection(socket, user, event);
                        });
                        break;
                    case Database.EDataBaseError.DOES_NOT_EXIST:
                        this.onLoginFail(socket, "Username does not exist.");
                        break;
                    case Database.EDataBaseError.WRONG_PASSWORD:
                        this.onLoginFail(socket, "Wrong combination of username and password.");
                        break;
                    case Database.EDataBaseError.UNKNOWN_ERROR:
                        this.onLoginFail(socket, "Unknown Error.")
                        break;
                    default:
                        break;
                }
            });
        } else if(event.eventId == Events.EEventType.CLIENT_REGISTER_REQ) {
            if(event.data.username.length == 0) {
                this.onRegisterFail(socket, "Username has to have more atleast on character.")
            } else if(event.data.password.length == 0) {
                this.onRegisterFail(socket, "Password has to have more atleast on character.")
            } else {
                Database.newUser(event.data.username, event.data.password, (error: Database.EDataBaseError, user: IUserDocument | undefined) => {
                    switch(error) {
                        case Database.EDataBaseError.NO_ERROR:
                            //@ts-ignore
                            Logger.info("User '" + user.username + "' logged in");
                            this.onLoginSuccess(socket);
                            socket.on('ClientEvent', (event : Events.GameEvent) => {
                                //@ts-ignore
                                this.handleClientCharacterSelection(socket, user, event);
                            });
                            break;
                        case Database.EDataBaseError.USERNAME_ALREADY_EXISTS:
                            this.onRegisterFail(socket, "Username already in use.")
                            break; 
                        case Database.EDataBaseError.UNKNOWN_ERROR:
                            this.onRegisterFail(socket, "Unknown Error.")
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    }

    private handleClientCharacterSelection(socket: any, user: IUserDocument, event: Events.GameEvent) {
        if(event.eventId == Events.EEventType.CLIENT_CHARACTER_LIST_REQ) {
            Database.getCharacters(user, (error: Database.EDataBaseError, characters: Array<SCharacter>) => {
                switch(error) {
                    case Database.EDataBaseError.NO_ERROR:
                        this.sendCharacters(socket, characters);
                        break;
                    default:
                        this.onCharacterListReqFailed(socket, "Failed to load characters.");
                        return;
                }
            });
        } else if(event.eventId == Events.EEventType.CLIENT_NEW_CHARACTER_REQ) {
            Database.writeNewCharacter(user, event.data.characterName, this.sectorHandler.getLocation(), (error: Database.EDataBaseError) => {
                switch(error) {
                    case Database.EDataBaseError.NO_ERROR:
                        Database.getCharacters(user, (error: Database.EDataBaseError, characters: Array<SCharacter>) => {
                            switch(error) {
                                case Database.EDataBaseError.NO_ERROR:
                                    this.sendCharacters(socket, characters);
                                    break;
                                default:
                                    this.onCharacterListReqFailed(socket, "Failed to load characters.");
                                    return;
                            }
                        });
                    default:
                        this.onNewCharacterFailed(socket, "Failed to create characters.");
                        return;
                }
            });
            
        } else if(event.eventId == Events.EEventType.CLIENT_JOIN_REQ) {
            Logger.info("User '" + user.username + "' joined with character '" + event.data.character.name + "'");

            Database.getCharacters(user, (error: Database.EDataBaseError, characters: Array<SCharacter>) => {
                switch(error) {
                    case Database.EDataBaseError.NO_ERROR:
                        let character : SCharacter | undefined = undefined;
                        for(let i = 0; i < characters.length; i++) {
                            if(characters[i].getData().name == event.data.character.name) {
                                character = characters[i];
                            }
                        }
                
                        if(character == undefined) {
                            Logger.debug("Could not find character: '" + event.data.character.name + "'");
                            this.onJoinFailed(socket, "Failed to join.");
                            return;
                        }
                        
                        let sectorArray : Array<ISector> = new Array();
                        let sectors : Array<SSector> = this.sectorHandler.getSectors();
                        for(let i = 0; i < sectors.length; i++) {
                            sectorArray.push({
                                sectorId: sectors[i].getSectorId(),
                                id : sectors[i].getId(),
                                x : sectors[i].getX(),
                                y : sectors[i].getY(),
                                name : sectors[i].getName(),
                                sectorType: sectors[i].getSectorType()
                            });
                        }
                
                        let sector : SSector | undefined = this.sectorHandler.getSector(character.getData().sectorId);
                        if(sector == undefined) {
                            this.connectionError("Could not find sector", socket);
                            return;
                        }
                
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
                        this.sectorHandler.addClientToSector(client, character.getData().sectorId);
                
                        socket.on('ClientEvent', (event : Events.GameEvent) => {
                            this.onClientEvent(client, event);
                        });
                        socket.on('disconnect', () => {
                            this.onDisconnect(client, user);
                        });
                        socket.emit("ServerEvent", packet); 
                        this.sendServerMessage(client, "Welcome to SpaceAge!");
                        break;
                    default:
                        this.onJoinFailed(socket, "Failed to join.");
                        return;
                }
            }) 
        }  
    }

    private sendCharacters(socket: any, characters: Array<SCharacter>) {
        let chars : Array<ICharacter> = [];
        characters.forEach(c => { chars.push(c.getData()) });
        let packet : Events.SERVER_CHARACTER_LIST_ACK = {
            eventId : Events.EEventType.SERVER_CHARACTER_LIST_ACK,
            data : {
              characters : chars
            }
        }
        socket.emit("ServerEvent", packet);  
    }

    private handleDisconnect() {
        Logger.info("User disconnected");
    }
  
    private onDisconnect(client: SClient, user: IUserDocument) {
        Logger.info("User '" + user.username + "' disconnected with character '" + client.getData().character.name + ".");
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
            client.startTrainSkill(event);
            break;
          }
          case Events.EEventType.TRAIN_SKILL_STOP : {
            client.stopTrainSkill();
            break;
          }
          case Events.EEventType.OPEN_CARGO_REQUEST: {
            this.onRequestOpenCargo(client, event);
            break;
          }
          case Events.EEventType.CLOSE_CARGO: {
            this.onCloseCargo(client, event);
            break;
          }
          case Events.EEventType.TAKE_ITEM_REQUEST: {
            this.onTakeItemsRequest(client, event);
          }
          default: {
            break;
          }
        }
    }

    private onTakeItemsRequest(client: SClient, event: Events.TAKE_ITEM_REQUEST_CONFIG) {
        let sector = this.sectorHandler.getSectorForPlayer(client);
        if(sector != undefined) {
            sector.takeItems(client, event.data.indexes, event.data.cargoId);
        }
    }

    private onRequestOpenCargo(client: SClient, event: Events.OPEN_CARGO_REQUEST_CONFIG) {
        let sector = this.sectorHandler.getSectorForPlayer(client);
        if(sector != undefined && sector.openCargoRequest(client, event.data.id)) {
            let packet : Events.OPEN_CARGO_ACK_CONFIG = {
                eventId : Events.EEventType.OPEN_CARGO_ACK,
                data : {
                  id: event.data.id
                }
              }
              client.getData().socket.emit("ServerEvent", packet);
        } else {
            let packet : Events.OPEN_CARGO_FAIL_CONFIG = {
                eventId : Events.EEventType.OPEN_CARGO_FAIL,
                data : {
                  id: event.data.id
                }
              }
              client.getData().socket.emit("ServerEvent", packet);
        }
    }

    private onCloseCargo(client: SClient, event: Events.CLOSE_CARGO_CONFIG) {
        let sector = this.sectorHandler.getSectorForPlayer(client);
        if(sector != undefined) {
           sector.closeCargo(client);
        }
    }
  
    private onPlayerStartAttackingEvent(client: SClient, event : Events.PLAYER_START_ATTACKING_EVENT_CONFIG) {
        client.getCharacter().startAttack(event.data.targetId);
    }
  
    private onPlayerStopAttackingEvent(client: SClient, event : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG) {
        client.getCharacter().stopAttack();
    }
  
    private onPlayerStartMiningEvent(client: SClient, event : Events.PLAYER_START_MINING_EVENT_CONFIG) {
        client.getCharacter().startMining(event.data.targetId);
    }
  
    private onPlayerStopMiningEvent(client: SClient, event : Events.PLAYER_STOP_MINING_EVENT_CONFIG) {
        client.getCharacter().stopMining();
    }
  
    private onPlayerSetNewDestinationEvent(client : SClient, event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
        client.getCharacter().newDestination(event.data.destinationX, event.data.destinationY);
    }
  
    private onPlayerStopShipEvent(client : SClient, event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG) {
        client.getCharacter().stopMove();
    }
  
    private onPlayerStartWarpEvent(client : SClient, event : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG) {
        //TODO, add check if they should be able to warp
        let sector = this.sectorHandler.getSectors().find(sector => sector.getId() == event.data.targetId);
        if(sector != undefined && ! client.getCharacter().getData().warpState.isWarping) {
            client.getCharacter().startWarp(sector);
            this.sectorHandler.onPlayerStartWarping(client, sector);
        }
    }
  
    private onChatMessageEvent(client : SClient, event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG) {
        this.broadcastChatMessage(client, event.data.message, event.data.sender);
    }
  
    private broadcastChatMessage(client : SClient, message : string, sender : string) {
        let packet : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG = {
          eventId : Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
          data : {
            message : message,
            sender : sender
          }
        }
        client.getData().socket.broadcast.emit("ServerEvent", packet);  
    }
  
    private sendServerMessage(client : SClient, message : string) {
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

    public addCombatLogMessage(receiver: SShip, message: ICombatLogMessage) {
        let receiverClient = this.clientMap.get(receiver.getData().id);
        if(receiverClient != undefined) {
            this.combatLogMessages.push({receiver: receiverClient, message: message});
        }
    }

    private sendCombatLogMessages() {
        this.combatLogMessages.forEach(obj => {
            let packet : Events.CLIENT_RECEIVE_COMBAT_LOG_EVENT_CONFIG = {
                eventId : Events.EEventType.CLIENT_RECEIVE_COMBAT_LOG_EVENT,
                data : {
                  message : obj.message
                }
              }
            obj.receiver.getData().socket.emit("ServerEvent", packet); 
        });
        this.combatLogMessages = new Array();
    }

    private onLoginFail(socket: any, message: string) {
        let packet: Events.SERVER_LOGIN_FAIL = {
            eventId: Events.EEventType.SERVER_LOGIN_FAIL,
            data: {
              message: message
            }
          }
        socket.emit("ServerEvent", packet);  
    }

    private onLoginSuccess(socket: any) {
        let packet: Events.SERVER_LOGIN_ACK = {
            eventId: Events.EEventType.SERVER_LOGIN_ACK,
            data: {

            }
        }
        socket.emit("ServerEvent", packet);  
    }

    private onRegisterFail(socket: any, message: string) {
        let packet: Events.SERVER_REGISTER_FAIL = {
            eventId: Events.EEventType.SERVER_REGISTER_FAIL,
            data: {
                message: message
            }
        }
        socket.emit("ServerEvent", packet);
    }

    private onJoinFailed(socket: any, message: string) {
        let packet: Events.SERVER_JOIN_FAIL = {
            eventId: Events.EEventType.SERVER_JOIN_FAIL,
            data: {
                message: message
            }
        }
        socket.emit("ServerEvent", packet);
    }

    private onCharacterListReqFailed(socket: any, message: string) {
        let packet: Events.SERVER_CHARACTER_LIST_FAIL = {
            eventId: Events.EEventType.SERVER_CHARACTER_LIST_FAIL,
            data: {
                message: message
            }
        }
        socket.emit("ServerEvent", packet);
    }

    private onNewCharacterFailed(socket: any, message: string) {
        let packet: Events.SERVER_NEW_CHARACTER_FAIL = {
            eventId: Events.EEventType.SERVER_NEW_CHARACTER_FAIL,
            data: {
                message: message
            }
        }
        socket.emit("ServerEvent", packet);
    }
}