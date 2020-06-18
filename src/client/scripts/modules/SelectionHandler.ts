import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/util/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { Graphics } from "./graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";

export module SelectionHandler {

    let selectionIcon: Graphics.Sprite;
    let selectIconFadeInScale: number;
    let selectIconIsFadingIn: boolean;
    let selectedObject: RadarDetectable | undefined;

    export function init() {
        selectionIcon = new Graphics.Sprite(SPRITES.SELECTION_ICON.sprite, 0, 0);
        selectionIcon.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        selectionIcon.setVisible(false);
        selectIconIsFadingIn = false;
        selectIconFadeInScale = 0;
        selectedObject = undefined;
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let selectedObjectNoLongerVisible: boolean = selectedObject != undefined && !selectedObject.isDetected();
        let rightClickDetected: boolean = InputHandler.getMouseKeyState(InputHandler.EMouseKey.MOUSE_RIGHT) == InputHandler.EKeyState.PRESSED && selectedObject != undefined;
        if(selectedObjectNoLongerVisible || rightClickDetected) {
            changeSelection(undefined);
        }

        if(selectedObject != undefined) {    
            let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
            if(selectIconIsFadingIn) {
                selectionIcon.setDisplaySize(SPRITES.SELECTION_ICON.sprite.width * selectIconFadeInScale * cameraZoom, 
                    SPRITES.SELECTION_ICON.sprite.height * selectIconFadeInScale * cameraZoom);
                selectIconFadeInScale -= 0.05;
                if(selectIconFadeInScale <= 1) {
                    selectIconIsFadingIn = false;
                }
            } else {
                selectionIcon.setDisplaySize(SPRITES.SELECTION_ICON.sprite.width * cameraZoom, SPRITES.SELECTION_ICON.sprite.height * cameraZoom);
            }
            let selectedObjectPos = selectedObject.getPos();
            selectionIcon.setPos(selectedObjectPos.x, selectedObjectPos.y);
            selectionIcon.update();
        }

        selectionIcon.setVisible(selectedObject != undefined);
    }

    export function getSelection(): RadarDetectable | undefined {
        return selectedObject;
    }

    export function changeSelection(newSelection: RadarDetectable | undefined) {
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == newSelection || selectedObject == newSelection) {
            selectedObject = undefined;
        } else {
            selectedObject = newSelection;
        }

        if(newSelection != undefined) {
            selectIconIsFadingIn = true;
            selectIconFadeInScale = 2;
        }

        GlobalDataService.getInstance().setSelectedObject(selectedObject);
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
        if(selectedObject != undefined && selectedObject.getId() == event.data.shipId) {
            changeSelection(undefined);
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        if(selectedObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == selectedObject.getId());
            if(found) {
                changeSelection(undefined);
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }
}