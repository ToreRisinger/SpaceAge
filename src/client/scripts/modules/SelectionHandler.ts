import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";

export module SelectionHandler {

    export function init() {
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        if(selectedObject != undefined && !selectedObject.isDetected()) {
            selectedObject = undefined;
            sendSelectionChangedEvent();
        } else if(InputHandler.getKeyState(InputHandler.KEY.MOUSE_RIGHT) == InputHandler.KEY_STATE.PRESSED && selectedObject != undefined) {
            selectedObject = undefined;
            sendSelectionChangedEvent();
        }
    }

    function onSelectionChangeRequest(event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == event.data.object || selectedObject == event.data.object) {
            selectedObject = undefined;
        } else {
            selectedObject = event.data.object;
        }
        
        sendSelectionChangedEvent()
    }

    function sendSelectionChangedEvent() {
        let newEvent : Events.SELECTION_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.SELECTION_CHANGED_EVENT,
            data : {
                object : GlobalDataService.getInstance().getSelectedObject()
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        if(selectedObject != undefined && selectedObject.getGameObjectData().id == event.data.shipId) {
            selectedObject = undefined;
            sendSelectionChangedEvent();
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        if(selectedObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == selectedObject.getGameObjectData().id);
            if(found) {
                selectedObject = undefined;
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