import { RadarDetectable } from "../../client/scripts/game_objects/RadarDetectable";
import { EGameState } from "./EGameState";
import { ICharacter } from "../data/gameobject/ICharacter";
import { ICargo } from "../data/ICargo";
import { ISpaceStation } from "../data/gameobject/ISpaceStation";
import { ISector } from "../data/sector/ISector";
import { IAsteroid } from "../data/astroid/IAstroid";
import { ISkill } from "../data/skills/ISkill";
import { ICombatLogMessage } from "../data/CombatLogInterfaces";
import { INpc } from "../data/npc/INpc";
import { IContainer } from "../data/gameobject/IContainer";
import { ISceneObject } from "../data/gameobject/ISceneObject";


export module Events {

    export enum EEventType {

        //Player events
        PLAYER_CONNECTED_EVENT,
        PLAYER_DISCONNECTED_EVENT,
        SHIPS_UPDATE_EVENT,
        CONTAINER_UPDATE_EVENT,
        ASTEROIDS_UPDATE_EVENT,
        CARGO_UPDATE_EVENT,
        SPACE_STATION_UPDATE_EVENT,
        SCENE_OBJECT_UPDATE_EVENT,

        GAME_OBJECT_DESTOYED_EVENT,
        CHANGE_SECTOR_EVENT,
        SKILL_STATE_EVENT,

        //Chat events
        CLIENT_SEND_CHAT_MESSAGE_EVENT,
        CLIENT_RECEIVE_CHAT_MESSAGE_EVENT,
        CHAT_SERVER_MESSAGE_EVENT,
        CLIENT_RECEIVE_COMBAT_LOG_EVENT,
        NEW_CHAT_MESSAGES_RECEIVED,

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
        TRAIN_SKILL_START,
        TRAIN_SKILL_STOP,
        OPEN_CARGO_REQUEST,
        OPEN_CARGO_ACK,
        OPEN_CARGO_FAIL,
        TAKE_ITEM_REQUEST,
        CLOSE_CARGO,

        //GameState changes events
        GAME_STATE_CHANGE,
        CLIENT_LOGIN_REQ,
        SERVER_LOGIN_ACK,
        SERVER_LOGIN_FAIL,
        CLIENT_JOIN_REQ,
        SERVER_JOIN_ACK,
        SERVER_JOIN_FAIL,
        CLIENT_CHARACTER_LIST_REQ,
        SERVER_CHARACTER_LIST_ACK,
        SERVER_CHARACTER_LIST_FAIL,
        CLIENT_NEW_CHARACTER_REQ,
        SERVER_NEW_CHARACTER_FAIL,
        CLIENT_REGISTER_REQ,
        SERVER_REGISTER_FAIL,
        CLIENT_DOCK_REQ,
        
        //Input
        MOUSE_PRESSED_EVENT,
        BACKGROUND_CLICKED_ONCE_EVENT,
        BACKGROUND_CLICKED_TWICE_EVENT,
        SELECTION_CHANGED_EVENT,
        TARGET_CHANGED_EVENT,
        ZOOM_CHANGED_EVENT,
        SKILL_STATE_UPDATED_EVENT,

        //Commands
        COMMAND_EVENT,

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
        data: {}
    }

    export interface SERVER_LOGIN_FAIL extends GameEvent {
        data: {
            message: string
        }
    }

    export interface CLIENT_REGISTER_REQ extends GameEvent {
        data: {

        }
    }

    export interface SERVER_REGISTER_FAIL extends GameEvent {
        data: {
            message: string
        }
    }

    export interface CLIENT_JOIN_REQ extends GameEvent {
        data: {
            character: ICharacter
        }
    }

    export interface SERVER_JOIN_ACK extends GameEvent {
        data: {
            character: ICharacter,
            sectors: Array<ISector>,
            clientSectorId: number
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
            characters: Array<{character: ICharacter}>,
            npcs: Array<{npc: INpc}>
        }
    }

    export interface CONTAINER_UPDATE_EVENT_CONFIG extends GameEvent {
        data: {
            containers: Array<IContainer>,
        }
    }

    export interface ASTEROIDS_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            asteroids : Array<IAsteroid>
        }
    }

    export interface SPACE_STATION_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            spaceStation: ISpaceStation
        }
    }

    export interface SCENE_OBJECT_UPDATE_EVENT_CONFIG extends GameEvent {
        data: {
            sceneObjects: Array<ISceneObject>
        }
    }

    export interface CARGO_UPDATE_EVENT_CONFIG extends GameEvent {
        data : {
            cargo : ICargo
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

    export interface SELECTION_CHANGED_EVENT_CONFIG extends GameEvent {
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
            sender : string;
            message : string;
        }
    }

    export interface CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG extends GameEvent {
        data : {
            sender : string;
            message : string;
        }
    }

    export interface TRAIN_SKILL_START_CONFIG extends GameEvent {
        data: {
            skillIndex: number
        }
    }

    export interface TRAIN_SKILL_STOP_CONFIG extends GameEvent {
        data: {
            
        }
    }

    export interface SKILL_STATE_EVENT_CONFIG extends GameEvent {
        data: {
            skills: {
                skillList: Array<ISkill>,
                currentlyTrainingIndex: number 
            }
        }
    }

    export interface SKILL_STATE_UPDATED_EVENT_CONFIG extends GameEvent {
        data: {}
    }

    export interface NEW_CHAT_MESSAGES_RECEIVED_CONFIG extends GameEvent {
        data: {}
    }

    export interface CLIENT_RECEIVE_COMBAT_LOG_EVENT_CONFIG extends GameEvent {
        data: {
            message: ICombatLogMessage 
        }
    }

    export interface COMMAND_EVENT_CONFIG extends GameEvent {
        data: {
            command: string
        }
    }

    export interface OPEN_CARGO_ACK_CONFIG extends GameEvent {
        data: {
            id: number
        }
    }

    export interface OPEN_CARGO_FAIL_CONFIG extends GameEvent {
        data: {
            id: number
        }
    }

    export interface OPEN_CARGO_REQUEST_CONFIG extends GameEvent {
        data: {
            id: number
        }
    }

    export interface CLOSE_CARGO_CONFIG extends GameEvent {
        data: { }
    }

    export interface TAKE_ITEM_REQUEST_CONFIG extends GameEvent {
        data: {
            indexes: Array<number>
            cargoId: number
        }
    }

    export interface SERVER_JOIN_FAIL extends GameEvent {
        data: {
            message: string
        }
    }

    export interface CLIENT_CHARACTER_LIST_REQ extends GameEvent {
        data: { }
    }

    export interface SERVER_CHARACTER_LIST_ACK extends GameEvent {
        data: {
            characters: Array<ICharacter>
        }
    }

    export interface SERVER_CHARACTER_LIST_FAIL extends GameEvent {
        data: {
            message: string
        }
    }

    export interface CLIENT_NEW_CHARACTER_REQ extends GameEvent {
        data: {
            characterName: string
        }
    }

    export interface SERVER_NEW_CHARACTER_FAIL extends GameEvent {
        data: {
            message: string
        }
    }

    export interface CLIENT_DOCK_REQ extends GameEvent {
        data: {
            spaceStationId: number
        }
    }
}

