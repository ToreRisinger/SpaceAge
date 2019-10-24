import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module Chat {

    export interface IChatMessage {
        message : String,
        sender : String
    }

    let chatMessages : Array<IChatMessage> = [];

    let chat_input : HTMLElement | null;

    export function init() {
        chat_input = document.getElementById("chat_input");
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {

    }

    function onKeyPressed(event : Events.KEY_PRESSED_EVENT_CONFIG) {
        if(event.data.key == "enter") {
            //@ts-ignore
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
                //@ts-ignore
                
                let event : Events.CLIENT_SEND_CHAT_MESSAGE_EVENT_CONFIG = {
                    eventId : Events.EEventType.CLIENT_SEND_CHAT_MESSAGE_EVENT,
                    data : {
                        message: message,
                        sender: GlobalData.playerUsername
                    }
                }

                EventHandler.pushEvent(event);
                //@ts-ignore
                chat_input.value = null;

                addMessage(GlobalData.playerUsername, message);
            }
        }
    }

    export function getChatMessages() : Array<IChatMessage> {
        return chatMessages;
    }

    function addMessage(sender : String, message : String) {
        chatMessages.unshift({message: message, sender: sender});
    }

    function onClientChatMessageReceived(event : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG) {
        addMessage(event.data.sender, event.data.message); 
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.KEY_PRESSED_EVENT, onKeyPressed);
        EventHandler.on(Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT, onClientChatMessageReceived);
    }
}