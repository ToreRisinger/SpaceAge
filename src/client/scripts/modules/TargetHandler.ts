import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/util/Events";
import { GlobalDataService } from "./GlobalDataService";
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { Graphics } from "./graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";

export module TargetHandler {
    
    let targetIcon: Graphics.TargetSprite;
    let targetObject: RadarDetectable | undefined;

    export function init() {
        targetIcon = new Graphics.TargetSprite(SPRITES.TARGET_ICON.sprite, 0, 0);
        targetObject = undefined;
        subscribeToEvents();
    }

    export function deinit() {
        targetIcon.destroy();
    }

    export function update(time : number, delta : number) {
        if(targetObject != undefined && !targetObject.isDetected()) {
            changeTarget(undefined);
        }

        if(targetObject != undefined) {
            let targetPos = targetObject.getPos();
            targetIcon.setPos(targetPos.x, targetPos.y)
            targetIcon.update();
        }

        targetIcon.setVisible(targetObject != undefined);
    }

    export function getTarget(): RadarDetectable | undefined {
        return targetObject;
    }

    export function changeTarget(newTarget: RadarDetectable | undefined) {
        if(GlobalDataService.getInstance().getPlayerShip().isAttacking()) {
            stopAttack();
        } else if(GlobalDataService.getInstance().getPlayerShip().isMining()) {
            stopMine();
        }

        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip == newTarget) {
            targetObject = undefined;
        } else {
            targetObject = newTarget;
        } 

        GlobalDataService.getInstance().setTargetObject(targetObject);

        if(newTarget != undefined) {
            targetIcon.trigger();
        }
        
        sendTargetChangedEvent()
    }

    function sendTargetChangedEvent() {
        let newEvent : Events.TARGET_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.TARGET_CHANGED_EVENT,
            data : {
                object : targetObject
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    function onPlayerDisconnect(event : Events.PLAYER_LEFT_EVENT_CONFIG) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined && targetObject.getId() == event.data.shipId) {
            changeTarget(undefined);
        }
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        let targetObject = GlobalDataService.getInstance().getTargetObject();
        if(targetObject != undefined) {
            //@ts-ignore
            let found = event.data.gameObjectIds.find(gameObjectId => gameObjectId == targetObject.getId());
            if(found) {
                changeTarget(undefined);
            }
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_LEFT_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
    }

    function stopAttack() {
        let newEvent : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_ATTACKING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }

    function stopMine() {
        let newEvent : Events.PLAYER_STOP_MINING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_MINING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }
}