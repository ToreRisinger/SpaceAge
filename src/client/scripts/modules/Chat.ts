import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module Chat {

    let chat_window : HTMLElement | null;
    let chat_window_input : HTMLElement | null;
    export function init() {
        chat_window = document.getElementById("chat_window");
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
                
                let event : Events.CHAT_MESSAGE_EVENT_CONFIG = {
                    eventId : Events.EEventType.CHAT_MESSAGE_EVENT,
                    data : {
                        message: message,
                        sender: GlobalData.playerUsername
                    }
                }
                EventHandler.pushEvent(event);
                //@ts-ignore
                chat_window_input.value = null;
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.KEY_PRESSED_EVENT, onKeyPressed);
    }
}