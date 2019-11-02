import { ObjectInterfaces } from "./ObjectInterfaces"
import { GameObject } from "../../client/scripts/game_objects/GameObject";


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

        //Chat events
        CLIENT_SEND_CHAT_MESSAGE_EVENT,
        CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
        CHAT_SERVER_MESSAGE_EVENT,

        //Game logic events
        PLAYER_SET_NEW_DESTINATION_EVENT,

        //GameState changes events
        SPACE_SCENE_GAME_STATE_EVENT,

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

    export interface INITAL_GAME_LOAD_EVENT_CONFIG extends GameEvent {
        data : {
            ship : ObjectInterfaces.IShip
        }
    }

    export interface PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG extends GameEvent {
        data : {
            destinationX: number,
            destinationY: number
        }
    }

    export interface SHIPS_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            ships : Array<ObjectInterfaces.IShip>
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
            object : GameObject | undefined;
        }
    }

    export interface SELECTION_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            object : GameObject | undefined;
        }
    }

    export interface TARGET_CHANGE_REQUEST_EVENT_CONFIG extends GameEvent {
        data : {
            object : GameObject | undefined;
        }
    }

    export interface TARGET_CHANGED_EVENT_CONFIG extends GameEvent {
        data : {
            object : GameObject | undefined;
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

