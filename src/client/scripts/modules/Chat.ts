import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";
import { checkServerIdentity } from "tls";

export module Chat {

    let chat_message_window : HTMLElement | null;
    let chat_window_input : HTMLElement | null;

    export function init() {
        chat_message_window = document.getElementById("chat_message_window");
        chat_window_input = document.getElementById("chat_window_input");

        subscribeToEvents();
    }

    export function update(time : number, delta : number) {

    }

    function onKeyPressed(event : Events.KEY_PRESSED_EVENT_CONFIG) {
        if(event.data.key == "enter") {
            //@ts-ignore
            let message : String | null = chat_window_input.value;
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
                chat_window_input.value = null;

                addMessage(GlobalData.playerUsername, message);
            }
        }
    }

    function addMessage(sender : String, message : String) {
        let chat_message_container : HTMLElement = document.createElement("div");
        chat_message_container.id = "chat_message_container";
        chat_message_container.textContent = sender + ": " + message;
        //@ts-ignore
        chat_message_window.insertBefore(chat_message_container, chat_message_window.firstChild);
    }

    function onClientChatMessageReceived(event : Events.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT_CONFIG) {
        addMessage(event.data.sender, event.data.message); 
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.KEY_PRESSED_EVENT, onKeyPressed);
        EventHandler.on(Events.EEventType.CLIENT_RECEIVE_CHAT_MESSAGE_EVENT, onClientChatMessageReceived);
    }
}