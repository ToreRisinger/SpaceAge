import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/util/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { ICombatLogMessage } from "../../../shared/data/CombatLogInterfaces";
import { IChatMessage } from "../../../shared/data/IChatMessage";

export module Chat {

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
            //@ts-ignore 
            chat_input.disabled = true;
        }
        
        if(InputHandler.getKeyState(InputHandler.EKey.ENTER) == InputHandler.EKeyState.PRESSED) {
            if(chat_input === document.activeElement) {
                //@ts-ignore
                chat_input.blur();
                //@ts-ignore
                chat_input.disabled = true;
                InputHandler.setChatInputIsActive(false);
            } else {
                //@ts-ignore
                chat_input.disabled = false;
                //@ts-ignore
                chat_input.focus();
                InputHandler.setChatInputIsActive(true);
            }

            //@ts-ignore
            let message : String | null = chat_input.value;
            if(message) {
                let characterName = GlobalDataService.getInstance().getCharacterName();
                
                let event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG = {
                    eventId : Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT,
                    data : {
                        message: message,
                        sender: characterName
                    }
                }

                EventHandler.pushEvent(event);
                //@ts-ignore
                chat_input.value = null;

                addMessage(characterName, message);
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