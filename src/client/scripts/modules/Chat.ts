import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { ICombatLogMessage } from "../../../shared/interfaces/CombatLogInterfaces";

export module Chat {

    export interface IChatMessage {
        message : String,
        sender : String
    }

    let chatMessages : Array<IChatMessage> = [];
    let combatLog: Array<ICombatLogMessage> = [];

    let chat_input : HTMLElement | null;

    export function init() {
        chat_input = document.getElementById("chat_input");
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        checkEnterPressed()
    }

    function checkEnterPressed() {
        if(chat_input == null) {
            chat_input = document.getElementById("chat_input");
        }
        
        if(InputHandler.getKeyState(InputHandler.KEY.ENTER) == InputHandler.KEY_STATE.PRESSED) {
            if(chat_input === document.activeElement) {
                //@ts-ignore
                chat_input.blur();
            } else {
                //@ts-ignore
                chat_input.focus();
            }

            //@ts-ignore
            let message : String | null = chat_input.value;
            if(message) {
                let userName = GlobalDataService.getInstance().getUsername();
                
                let event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG = {
                    eventId : Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT,
                    data : {
                        message: message,
                        sender: userName
                    }
                }

                EventHandler.pushEvent(event);
                //@ts-ignore
                chat_input.value = null;

                addMessage(userName, message);
            }
        }
    }

    export function getChatMessages() : Array<IChatMessage> {
        return chatMessages;
    }

    export function getCombatLogMessages() : Array<ICombatLogMessage> {
        return combatLog;
    }

    function addMessage(sender : String, message : String) {
        chatMessages.unshift({message: message, sender: sender});
        let event : Events.NEW_CHAT_MESSAGES_RECEIVED_CONFIG = {
            eventId : Events.EEventType.NEW_CHAT_MESSAGES_RECEIVED,
            data: {}
        }
        EventHandler.pushEvent(event);

    }

    function addCombatLog(message: ICombatLogMessage) {
        combatLog.unshift(message);
        let event : Events.NEW_CHAT_MESSAGES_RECEIVED_CONFIG = {
            eventId : Events.EEventType.NEW_CHAT_MESSAGES_RECEIVED,
            data: {}
        }
        EventHandler.pushEvent(event);

    }

    function onClientChatMessageReceived(event : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG) {
        addMessage(event.data.sender, event.data.message); 
    }

    function onClientCombatLogMessageReceived(event : Events.CLIENT_RECEIVE_COMBAT_LOG_EVENT_CONFIG) {
        addCombatLog(event.data.message); 
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT, onClientChatMessageReceived);
        EventHandler.on(Events.EEventType.CLIENT_RECEIVE_COMBAT_LOG_EVENT, onClientCombatLogMessageReceived);
    }
}