import { ObjectInterfaces } from "./ObjectInterfaces"


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
        CHAT_MESSAGE_EVENT,
        CHAT_SERVER_MESSAGE_EVENT,

        //Game logic events
        PLAYER_SET_NEW_DESTINATION_EVENT,

        //GameState changes events
        SPACE_SCENE_GAME_STATE_EVENT,

        //Input
        KEY_PRESSED_EVENT,
        MOUSE_PRESSED_EVENT,
        BACKGROUND_CLICKED_EVENT,

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

    export interface KEY_PRESSED_EVENT_CONFIG extends GameEvent {
        data : {
            key : String
        }
    }

    export interface MOUSE_PRESSED_EVENT_CONFIG extends GameEvent {
        data : {
            mouseX : number;
            mouseY : number;
        }
    }

    export interface BACKGROUND_CLICKED_EVENT_CONFIG extends GameEvent {
        data : {
            mouseX : number;
            mouseY : number;
        }
    }

    
}

