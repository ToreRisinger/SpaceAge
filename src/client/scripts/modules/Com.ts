import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"

export module Com {

    let socket : any;
    export function init() {

        //@ts-ignore
        socket = io();

        subscribeToEvents();

        socket.on('ServerEvent', (event : any) => {
            EventHandler.pushEvent(event);  
        });
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_STOP_SHIP_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT, onClientEvent);
    }

    function onClientEvent(event : Events.GameEvent) {
        socket.emit('ClientEvent', event)
    }
}