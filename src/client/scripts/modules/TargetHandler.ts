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
            sendTargetChangedEvent();
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        if(GlobalData.targetObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.filter(gameObjectId => gameObjectId == GlobalData.targetObject.getGameObjectData().id);
            if(found) {
                GlobalData.targetObject = undefined;
                sendTargetChangedEvent();
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.TARGET_CHANGE_REQUEST_EVENT, onTargetChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }
}