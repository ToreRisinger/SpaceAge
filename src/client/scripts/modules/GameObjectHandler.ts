import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"
import { CONSTANTS } from "../constants/CONSTANTS";
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { Camera } from "./Camera";
import { GameEvent } from "../events/GameEvent";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();

    export function init() {
        subscribeToEvents();
    }

    export function create() {  

    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update();
        });
        
    }

    export function getShip() {
        return gameObjects.get(thisShipId);
    }

    function onPlayerLoad(eventData : GameEvent) {
        let data : any = eventData.getEventData();
        let ship = data.ship;
        thisShipId = ship.id;
        if(gameObjects.get(thisShipId) == undefined) {
            let newShip : Ship = new Ship();
            newShip.setPos(new Phaser.Math.Vector2(ship.x, ship.y));
           
            gameObjects.set(thisShipId, newShip);
            let thisShip : Ship = (<Ship>gameObjects.get(thisShipId));
            thisShip.setDestinationPos(new Phaser.Math.Vector2(ship.destinationX, ship.destinationY));
            thisShip.setIsMoving(ship.isMoving); 
        }
        //@ts-ignore
        gameObjects.get(thisShipId).setToThisPlayerShip();
        Camera.centerCamera(true);
    }

    function onPlayerConnect(event : GameEvent) {

    }

    function onPlayerDisconnect(event : GameEvent) {
        destroyGameObject(event.getEventData().shipId);
    }

    function onGameObjectUpdate(event : GameEvent) {
        let shipArray : Array<any> = event.getEventData();
        shipArray.forEach((ship: any) => {
            if(gameObjects.get(ship.id) == undefined) {
                let newShip : Ship = new Ship();
                gameObjects.set(ship.id, newShip);
                if(ship.id == thisShipId) {
                    newShip.setToThisPlayerShip();
                }
            }
            let currentShip : Ship = (<Ship>gameObjects.get(ship.id));
            currentShip.setPos(new Phaser.Math.Vector2(ship.x, ship.y));
            currentShip.setDestinationPos(new Phaser.Math.Vector2(ship.destinationX, ship.destinationY));
            currentShip.setIsMoving(ship.isMoving); 
        });
    }

    function onNewShipDestination(event : GameEvent) {

    }

    function subscribeToEvents() {
        EventHandler.on(EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(EEventType.GAME_OBJECT_UPDATE_EVENT, onGameObjectUpdate);
        EventHandler.on(EEventType.PLAYER_LOAD_EVENT, onPlayerLoad);
        EventHandler.on(EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onNewShipDestination);
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}