import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module SelectionHandler {

    export function init() {
        subscribeToEvents();
    }

    function onSelectionChangeRequest(event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG) {
        /*
        if(GlobalData.selectedObject == undefined || event.data.object == undefined) {
            GlobalData.selectedObject = event.data.object;
        //@ts-ignore
        } else if((GlobalData.selectedObject.id == event.data.object.id) || event.data.object.id == GlobalData.getPlayerShipData().id ) {
            GlobalData.selectedObject = undefined; //Select same object again will make it unselected
        } else {
            GlobalData.selectedObject = event.data.object;
        }
        */

        if(GlobalData.playerShip == event.data.object || GlobalData.selectedObject == event.data.object) {
            GlobalData.selectedObject = undefined;
        } else {
            GlobalData.selectedObject = event.data.object;
        }
        
        let newEvent : Events.SELECTION_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.SELECTION_CHANGED_EVENT,
            data : {
                object : GlobalData.selectedObject
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        if(GlobalData.selectedObject != undefined && GlobalData.selectedObject.getGameObjectData().id == event.data.shipId) {
            GlobalData.selectedObject = undefined;
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SELECTION_CHANGE_REQUEST_EVENT, onSelectionChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
    }
}