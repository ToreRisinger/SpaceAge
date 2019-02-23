import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"
import { Player } from "../player/Player";
import { CONSTANTS } from "../constants/CONSTANTS";
import { Ship } from "../game_objects/Ship";

export module GameObjectHandler {

    let thisPlayerId : number = 0;
    let playerMap : { [key:number]:Player} = {};

    export function init() {
        subscribeToEvents();
    }

    export function create() {  
        playerMap[thisPlayerId] = new Player(thisPlayerId, new Ship()); 
        playerMap[thisPlayerId].getShip().setX(0);
        playerMap[thisPlayerId].getShip().setY(0);
    }

    export function update(time : number, delta : number) {

    }

    export function getThisPlayer() {
        return playerMap[thisPlayerId];
    }

    function onPlayerIdReceived(eventData : any) {
        thisPlayerId = eventData.playerId;
    }

    function onPlayerLoad(eventData : any) {
        playerMap[thisPlayerId].getShip().setX(eventData.x);
        playerMap[thisPlayerId].getShip().setY(eventData.y);
    }

    function onPlayerConnect(eventData : any) {

    }

    function onPlayerDisconnect(eventData : any) {
        
    }

    function onNewPlayerPositions(eventData : any) {
        
    }

    function subscribeToEvents() {
        EventHandler.on(EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(EEventType.PLAYER_POSITION_EVENT, onNewPlayerPositions);
        EventHandler.on(EEventType.PLAYER_POSITION_EVENT, onNewPlayerPositions);
        EventHandler.on(EEventType.PLAYER_LOAD_EVENT, onPlayerLoad);
    }
}