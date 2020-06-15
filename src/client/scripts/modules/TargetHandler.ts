import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalDataService } from "./GlobalDataService";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { GameScene } from "../scenes/GameScene";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { Graphics } from "./graphics/Graphics";

export module TargetHandler {
    
    let targetIcon: Graphics.Sprite;
    let targetIconFadeInScale: number;
    let targetIconIsFadingIn: boolean;

    export function init() {
        targetIcon = new Graphics.Sprite(SPRITES.TARGET_ICON.sprite, 0, 0);
        targetIcon.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        targetIcon.setVisible(false);
        targetIconIsFadingIn = false;
        targetIconFadeInScale = 0;
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined && !targetObject.isDetected()) {
            GlobalDataService.getInstance().setTargetObject(undefined);
            sendTargetChangedEvent()
        }

        if(targetObject != undefined) {
            targetIcon.setPos(targetObject.getGameObjectData().x, targetObject.getGameObjectData().y)
            let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
            if(targetIconIsFadingIn) {
                targetIcon.setDisplaySize(SPRITES.TARGET_ICON.sprite.width * targetIconFadeInScale * cameraZoom, 
                    SPRITES.TARGET_ICON.sprite.height * targetIconFadeInScale * cameraZoom);
                targetIconFadeInScale -= 0.05;
                if(targetIconFadeInScale <= 1) {
                    targetIconIsFadingIn = false;
                }
            } else {
                targetIcon.setDisplaySize(SPRITES.TARGET_ICON.sprite.width * cameraZoom, SPRITES.TARGET_ICON.sprite.height * cameraZoom);
            }
            targetIcon.update();
        }

        targetIcon.setVisible(targetObject != undefined);
    }

    function changeTarget(newTarget: RadarDetectable | undefined) {
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == newTarget) {
            GlobalDataService.getInstance().setTargetObject(undefined);
        } else {
            GlobalDataService.getInstance().setTargetObject(newTarget);
        }

        if(newTarget != undefined) {
            targetIconIsFadingIn = true;
            targetIconFadeInScale = 2;
        }
        
        sendTargetChangedEvent()
    }

    function onTargetChangeRequest(event : Events.TARGET_CHANGE_REQUEST_EVENT_CONFIG) {
        changeTarget(event.data.object);
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
            changeTarget(undefined);
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == targetObject.getGameObjectData().id);
            if(found) {
                changeTarget(undefined);
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.TARGET_CHANGE_REQUEST_EVENT, onTargetChangeRequest);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }
}