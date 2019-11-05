import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module TargetHandler {

    export function init() {
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        if(GlobalData.targetObject != undefined && !GlobalData.targetObject.isDetected()) {
            GlobalData.targetObject = undefined;
            sendTargetChangedEvent()
        }
    }

    function onTargetChangeRequest(event : Events.TARGET_CHANGE_REQUEST_EVENT_CONFIG) {
        if(GlobalData.playerShip == event.data.object) {
            GlobalData.targetObject = undefined;
        } else {
            GlobalData.targetObject = event.data.object;
        }
        
        sendTargetChangedEvent()
    }

    function sendTargetChangedEvent() {
        let newEvent : Events.TARGET_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.TARGET_CHANGED_EVENT,
            data : {
                object : GlobalData.targetObject
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        if(GlobalData.targetObject != undefined && GlobalData.targetObject.getGameObjectData().id == event.data.shipId) {
            GlobalData.targetObject = undefined;
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.TARGET_CHANGE_REQUEST_EVENT, onTargetChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
    }
}