import { GameEvent } from "../events/GameEvent"
import { EventHandler } from "./EventHandler"

export module Com {

    let socket;

    export function init() {
        subscribeToEvents();

        socket = io();

        socket.on('ServerEvent', (event : any) => {
            EventHandler.pushEvent(new GameEvent(event.data, event.type))
        });
    }

    function subscribeToEvents() {
        //TODO Com listens on events triggered by client to be send to server
    }
}