import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"

export module GameObjectHandler {

    export function init() {
        subscribeToEvents();
    }

    export function update() {

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