import { ObjectInterfaces } from "./ObjectInterfaces"
import { RadarDetectable } from "../../client/scripts/game_objects/RadarDetectable";
import { AsteroidData } from "./AsteroidData";
import { Sectors } from "./Sectors";
import { EGameState } from "./EGameState";
import { ICharacter } from "../interfaces/ICharacter";


export module Events {

    export enum EEventType {
        /*
            CLIENT EVENTS
        */
        INITAL_GAME_LOAD_EVENT,

        //Player events
        PLAYER_CONNECTED_EVENT,
        PLAYER_DISCONNECTED_EVENT,
        SHIPS_UPDATE_EVENT,
        ASTEROIDS_UPDATE_EVENT,
        CARGO_UPDATE_EVENT,
        GAME_OBJECT_DESTOYED_EVENT,
        CHANGE_SECTOR_EVENT,

        //Chat events
        CLIENT_SEND_CHAT_MESSAGE_EVENT,
        CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
        CHAT_SERVER_MESSAGE_EVENT,

        //Game logic events
        PLAYER_SET_NEW_DESTINATION_EVENT,
        PLAYER_STOP_SHIP_EVENT,
        PLAYER_START_ATTACKING_EVENT,
        PLAYER_STOP_ATTACKING_EVENT,
        PLAYER_START_MINING_EVENT,
        PLAYER_STOP_MINING_EVENT,
        PLAYER_CARGO_UPDATED_EVENT,
        PLAYER_START_WARP_REQUEST_EVENT,
        SECTOR_CHANGED_EVENT,

        //GameState changes events
        SPACE_SCENE_GAME_STATE_EVENT, //TODO remove
        GAME_STATE_CHANGE,
        CLIENT_LOGIN_REQ,
        SERVER_LOGIN_ACK,
        CLIENT_JOIN_REQ,
        SERVER_JOIN_ACK,

        //Input
        MOUSE_PRESSED_EVENT,
        BACKGROUND_CLICKED_ONCE_EVENT,
        BACKGROUND_CLICKED_TWICE_EVENT,
        SELECTION_CHANGE_REQUEST_EVENT,
        SELECTION_CHANGED_EVENT,
        TARGET_CHANGE_REQUEST_EVENT,
        TARGET_CHANGED_EVENT,
        ZOOM_CHANGED_EVENT

        /*
            SERVER EVENTS
        */
    }

    export interface GameEvent {
        eventId : EEventType,
        data : any
    }

    export interface GAME_STATE_CHANGED extends GameEvent {
        data : {
            gameState : EGameState
        }
    }

    export interface CLIENT_LOGIN_REQ extends GameEvent {
        data : {
            username : String,
            password : String
        }
    }

    export interface SERVER_LOGIN_ACK extends GameEvent {
        data : {
            characters : Array<ICharacter>
        }
    }

    export interface CLIENT_JOIN_REQ extends GameEvent {
        data : {
            character : ICharacter
        }
    }

    export interface SERVER_JOIN_ACK extends GameEvent {
        data : {
            character : ICharacter,
            sectors : Array<Sectors.ISector>,
            clientSectorId : number
        }
    }

    export interface INITAL_GAME_LOAD_EVENT_CONFIG extends GameEvent {
        data : {
            ship : ObjectInterfaces.IShip,
            cargo : ObjectInterfaces.ICargo,
            sectors : Array<Sectors.ISector>,
            clientSectorId : number
        }
    }

    export interface CHANGE_SECTOR_EVENT_CONFIG extends GameEvent {
        data : {
            clientSectorId : number
        }
    }

    export interface SECTOR_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            
        }
    }

    export interface PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG extends GameEvent {
        data : {
            destinationX: number,
            destinationY: number
        }
    }

    export interface PLAYER_STOP_SHIP_EVENT_CONFIG extends GameEvent {
        data : {
           
        }
    }

    export interface PLAYER_START_ATTACKING_EVENT_CONFIG extends GameEvent {
        data : {
            targetId : number
        }
    }

    export interface PLAYER_STOP_ATTACKING_EVENT_CONFIG extends GameEvent {
        data : { }
    }

    export interface PLAYER_START_MINING_EVENT_CONFIG extends GameEvent {
        data :  {
            targetId : number
        }
    }

    export interface PLAYER_STOP_MINING_EVENT_CONFIG extends GameEvent {
        data : { }
    }

    export interface SHIPS_UPDATE_EVENT_CONFIG extends GameEvent {
        data: {
            characters: Array<{ship: ObjectInterfaces.IShip, characterName : string}>
        }
    }

    export interface ASTEROIDS_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            asteroids : Array<AsteroidData.IAsteroid>
        }
    }

    export interface CARGO_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            cargo : ObjectInterfaces.ICargo
        }
    }

    export interface GAME_OBJECT_DESTOYED_EVENT_CONFIG extends GameEvent {
        data : {
            gameObjectIds : Array<number>
        }
    }

    export interface PLAYER_CARGO_UPDATED_EVENT_CONFIG extends GameEvent {
        data : {}
    }

    export interface PLAYER_START_WARP_REQUEST_EVENT_CONFIG extends GameEvent {
        data : {
            targetId : number
        }
    }

    export interface PLAYER_DISCONNECTED_EVENT_CONFIG extends GameEvent {
        data : {
            shipId : number 
        }
    }

    export interface MOUSE_PRESSED_EVENT_CONFIG extends GameEvent {
        data : {
            mouseX : number;
            mouseY : number;
        }
    }

    export interface BACKGROUND_CLICKED_ONCE_EVENT_CONFIG extends GameEvent {
        data : {
            mouseX : number;
            mouseY : number;
        }
    }

    export interface BACKGROUND_CLICKED_TWICE_EVENT_CONFIG extends GameEvent {
        data : {
            mouseX : number;
            mouseY : number;
        }
    }

    export interface SELECTION_CHANGE_REQUEST_EVENT_CONFIG extends GameEvent {
        data : {
            object : RadarDetectable | undefined;
        }
    }

    export interface SELECTION_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            object : RadarDetectable | undefined;
        }
    }

    export interface TARGET_CHANGE_REQUEST_EVENT_CONFIG extends GameEvent {
        data : {
            object : RadarDetectable | undefined;
        }
    }

    export interface TARGET_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            object : RadarDetectable | undefined;
        }
    }

    export interface ZOOM_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            zoom : number;
        }
    }

    export interface CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG extends GameEvent {
        data : {
            sender : String;
            message : String;
        }
    }

    export interface CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG extends GameEvent {
        data : {
            sender : String;
            message : String;
        }
    }
 
    
}

