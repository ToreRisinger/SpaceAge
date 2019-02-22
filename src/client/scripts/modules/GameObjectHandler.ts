import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"
import { Player } from "../player/Player";
import { CONSTANTS } from "../constants/CONSTANTS";

export module GameObjectHandler {

    let thisPlayer : Player;
    let playerMap : { [key:number]:Player} = {};

    export function init() {
        subscribeToEvents();
    }

    export function create() {  
        thisPlayer = new Player(0);
        playerMap[thisPlayer.getId()] = thisPlayer; 

        //Todo this will be changed
        thisPlayer.getShip().setX(0);
        thisPlayer.getShip().setY(0);
    }

    export function update(time : number, delta : number) {

    }

    export function getThisPlayer() {
        return thisPlayer;
    }

    function onPlayerConnect(eventData : any) {

    }

    function onPlayerDisconnect(eventData : any) {
        
    }

    function onNewPlayerPositions(eventData : any) {
        
    }

    function subscribeToEvents() {
        EventHandler.subscribe(EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.subscribe(EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.subscribe(EEventType.PLAYER_POSITION_EVENT, onNewPlayerPositions);
    }
}