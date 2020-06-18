import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/util/Events"

export module Com {

    let socket : any;
    export function init() {

        //@ts-ignore
        socket = io('http://78.66.108.88:8080')

        subscribeToEvents();

        socket.on('ServerEvent', (event : any) => {
            EventHandler.pushEvent(event);  
        });
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.CLIENT_JOIN_REQ, onClientEvent);
        EventHandler.on(Events.EEventType.CLIENT_LOGIN_REQ, onClientEvent);
        EventHandler.on(Events.EEventType.SERVER_LOGIN_ACK, onClientEvent);
        EventHandler.on(Events.EEventType.SERVER_JOIN_ACK, onClientEvent);

        EventHandler.on(Events.EEventType.TRAIN_SKILL_START, onClientEvent);
        EventHandler.on(Events.EEventType.TRAIN_SKILL_STOP, onClientEvent);
        
        EventHandler.on(Events.EEventType.PLAYER_START_ATTACKING_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_STOP_ATTACKING_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_START_MINING_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_STOP_MINING_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_STOP_SHIP_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT, onClientEvent);
        EventHandler.on(Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT, onClientEvent);
    }

    function onClientEvent(event : Events.GameEvent) {
        socket.emit('ClientEvent', event)
    }
}