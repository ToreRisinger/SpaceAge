import { GameEvent } from "../events/GameEvent"
import { EventHandler } from "./EventHandler"
import { EEventType } from "../../../shared/EEventType"

export module Com {

    let socket : any;

    export function init() {
        //@ts-ignore
        socket = io();

        subscribeToEvents();

        socket.on('ServerEvent', (event : any) => {
            EventHandler.pushEvent(new GameEvent(event.type, event.data))
        });
    }

    function subscribeToEvents() {
        EventHandler.on(EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onClientEvent);
    }

    function onClientEvent(event : GameEvent) {
        socket.emit('ClientEvent', {type: event.getEventType(), data: event.getEventData()})
    }
}