import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"
import { Player } from "../player/Player";

export module GameObjectHandler {

    let thisPlayer : Player;
    let playerMap : { [key:number]:Player} = {};

    export function init() {
        subscribeToEvents();
        thisPlayer = new Player(0);
        playerMap[thisPlayer.getId()] = thisPlayer;
    }

    export function update(time : number, delta : number) {

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