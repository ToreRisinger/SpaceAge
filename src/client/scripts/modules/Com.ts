import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/util/Events"
import { ConnectionConfiguration } from "../../../shared/constants/ConnectionConfiguration";

export module Com {

    let socket: any;
    let latency: number;

    export function init() {

        //@ts-ignore
        socket = io('http://' + ConnectionConfiguration.serverIp + ":" + ConnectionConfiguration.serverPort)
        
        subscribeToEvents();

        socket.on('ServerEvent', (event : any) => {
            EventHandler.pushEvent(event);  
        });

        socket.on('pong', (ms: number)=> {
            latency = ms;
        });
    }

    export function getLatency() {
        return latency;
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.CLIENT_JOIN_REQ, sendEventToServer);
        EventHandler.on(Events.EEventType.CLIENT_LOGIN_REQ, sendEventToServer);
        EventHandler.on(Events.EEventType.CLIENT_REGISTER_REQ, sendEventToServer);
        EventHandler.on(Events.EEventType. CLIENT_CHARACTER_LIST_REQ, sendEventToServer);
        EventHandler.on(Events.EEventType. CLIENT_NEW_CHARACTER_REQ, sendEventToServer);
        EventHandler.on(Events.EEventType.CLIENT_DOCK_REQ, sendEventToServer);
        
        EventHandler.on(Events.EEventType.TRAIN_SKILL_START, sendEventToServer);
        EventHandler.on(Events.EEventType.TRAIN_SKILL_STOP, sendEventToServer);
        
        EventHandler.on(Events.EEventType.PLAYER_START_ATTACKING_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_STOP_ATTACKING_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_START_MINING_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_STOP_MINING_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_STOP_SHIP_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT, sendEventToServer);
        EventHandler.on(Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT, sendEventToServer);

        EventHandler.on(Events.EEventType.OPEN_CARGO_REQUEST, sendEventToServer);
        EventHandler.on(Events.EEventType.CLOSE_CARGO, sendEventToServer);

        EventHandler.on(Events.EEventType.TAKE_ITEM_REQUEST, sendEventToServer);
    
    }

    function sendEventToServer(event : Events.GameEvent) {
        socket.emit('ClientEvent', event)
    }
}