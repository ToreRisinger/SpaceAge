import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { Graphics } from "./graphics/Graphics";

export module SelectionHandler {

    let selectionIcon: Graphics.Sprite;
    let selectIconFadeInScale: number;
    let selectIconIsFadingIn: boolean;

    export function init() {
        selectionIcon = new Graphics.Sprite(SPRITES.SELECTION_ICON.sprite, 0, 0);
        selectionIcon.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        selectionIcon.setVisible(false);
        selectIconIsFadingIn = false;
        selectIconFadeInScale = 0;
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        let selectedObjectNoLongerVisible: boolean = selectedObject != undefined && !selectedObject.isDetected();
        let rightClickDetected: boolean = InputHandler.getMouseKeyState(InputHandler.EMouseKey.MOUSE_RIGHT) == InputHandler.EKeyState.PRESSED && selectedObject != undefined;
        if(selectedObjectNoLongerVisible || rightClickDetected) {
            changeSelection(undefined);
        }

        if(selectedObject != undefined) {
            selectionIcon.setPos(selectedObject.getGameObjectData().x, selectedObject.getGameObjectData().y);
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
            
        }

        selectionIcon.setVisible(selectedObject != undefined);
    }

    function changeSelection(newSelection: RadarDetectable | undefined) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == newSelection || selectedObject == newSelection) {
            GlobalDataService.getInstance().setSelectedObject(undefined);
            
        } else {
            GlobalDataService.getInstance().setSelectedObject(newSelection);
        }

        if(newSelection != undefined) {
            selectIconIsFadingIn = true;
            selectIconFadeInScale = 2;
        }
        
        sendSelectionChangedEvent()
    }

    function onSelectionChangeRequest(event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG) {
        changeSelection(event.data.object);
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
            changeSelection(undefined);
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let selectedObject = GlobalDataService.getInstance().getSelectedObject();
        if(selectedObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == selectedObject.getGameObjectData().id);
            if(found) {
                changeSelection(undefined);
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SELECTION_CHANGE_REQUEST_EVENT, onSelectionChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }
}