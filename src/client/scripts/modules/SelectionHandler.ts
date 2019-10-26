import { GameScene } from "../scenes/GameScene";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module SelectionHandler {

    export function init() {
        subscribeToEvents();
    }

    function onSelectionChangeRequest(event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG) {
        GlobalData.selectedObject = event.data.object;
        let newEvent : Events.SELECTION_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.SELECTION_CHANGED_EVENT,
            data : {
                object : GlobalData.selectedObject
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SELECTION_CHANGE_REQUEST_EVENT, onSelectionChangeRequest);
    }
}