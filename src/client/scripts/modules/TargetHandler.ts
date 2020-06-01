import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalDataService } from "./GlobalDataService";

export module TargetHandler {

    export function init() {
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined && !targetObject.isDetected()) {
            GlobalDataService.getInstance().setTargetObject(undefined);
            sendTargetChangedEvent()
        }
    }

    function onTargetChangeRequest(event : Events.TARGET_CHANGE_REQUEST_EVENT_CONFIG) {
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == event.data.object) {
            GlobalDataService.getInstance().setTargetObject(undefined);
        } else {
            GlobalDataService.getInstance().setTargetObject(event.data.object);
        }
        
        sendTargetChangedEvent()
    }

    function sendTargetChangedEvent() {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        let newEvent : Events.TARGET_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.TARGET_CHANGED_EVENT,
            data : {
                object : targetObject
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined && targetObject.getGameObjectData().id == event.data.shipId) {
            GlobalDataService.getInstance().setTargetObject(undefined);
            sendTargetChangedEvent();
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == targetObject.getGameObjectData().id);
            if(found) {
                GlobalDataService.getInstance().setTargetObject(undefined);
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