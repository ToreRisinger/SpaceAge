import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { Camera } from "./Camera";
import { DataObjects } from "../../../shared/DataObjects";

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

    function onPlayerLoad(eventData : Events.PLAYER_LOAD_EVENT_CONFIG) {
        let data : any = eventData.data;
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

    function onPlayerConnect(event : Events.GameEvent) {

    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        destroyGameObject(event.data.shipId);
    }

    function onShipsUpdate(event : Events.SHIPS_UPDATE_EVENT_CONFIG) {
        let shipArray : Array<DataObjects.Ship> = event.data.ships;
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

    function onNewShipDestination(event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {

    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.PLAYER_LOAD_EVENT, onPlayerLoad);
        EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onNewShipDestination);
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}