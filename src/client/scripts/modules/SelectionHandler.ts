import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";
import { InputHandler } from "./InputHandler";
import { GameObject } from "../game_objects/GameObject";

export module SelectionHandler {

    export function init() {
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        if(GlobalData.selectedObject != undefined && !GlobalData.selectedObject.isDetected()) {
            GlobalData.selectedObject = undefined;
            sendSelectionChangedEvent();
        } else if(InputHandler.getKeyState(InputHandler.KEY.MOUSE_RIGHT) == InputHandler.KEY_STATE.PRESSED && GlobalData.selectedObject != undefined) {
            GlobalData.selectedObject = undefined;
            sendSelectionChangedEvent();
        }
    }

    function onSelectionChangeRequest(event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG) {
        if(GlobalData.playerShip == event.data.object || GlobalData.selectedObject == event.data.object) {
            GlobalData.selectedObject = undefined;
        } else {
            GlobalData.selectedObject = event.data.object;
        }
        
        sendSelectionChangedEvent()
    }

    function sendSelectionChangedEvent() {
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
            sendSelectionChangedEvent();
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        if(GlobalData.selectedObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == GlobalData.selectedObject.getGameObjectData().id);
            if(found) {
                GlobalData.selectedObject = undefined;
                sendSelectionChangedEvent();
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SELECTION_CHANGE_REQUEST_EVENT, onSelectionChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }
}