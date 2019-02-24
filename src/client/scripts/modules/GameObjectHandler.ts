import { EventHandler } from "./EventHandler"
import { EEventType } from "../events/EEventType"
import { CONSTANTS } from "../constants/CONSTANTS";
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { Camera } from "./Camera";
import { GameEvent } from "../events/GameEvent";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects : { [key:number]:GameObject} = {};

    export function init() {
        subscribeToEvents();
    }

    export function create() {  
        //playerMap[thisPlayerId] = new Player(thisPlayerId, new Ship()); 
        //playerMap[thisPlayerId].getShip().setX(0);
        //playerMap[thisPlayerId].getShip().setY(0);
    }

    export function update(time : number, delta : number) {

    }

    export function getShipX() {
        return gameObjects[thisShipId].getX();
    }

    export function getShipY() {
        return gameObjects[thisShipId].getY();
    }

    function onPlayerLoad(eventData : GameEvent) {
        console.log("onPlayerLoad");
        let data : any = eventData.getEventData();
        let ship = data.ship;
        thisShipId = ship.id;
        gameObjects[thisShipId] = new Ship();
        gameObjects[thisShipId].setX(ship.x);
        gameObjects[thisShipId].setY(ship.y);
        Camera.centerCamera(true);
    }

    function onPlayerConnect(eventData : GameEvent) {

    }

    function onPlayerDisconnect(eventData : GameEvent) {
        
    }

    function onNewPlayerPositions(eventData : GameEvent) {
        
    }

    function subscribeToEvents() {
        EventHandler.on(EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(EEventType.PLAYER_POSITION_EVENT, onNewPlayerPositions);
        EventHandler.on(EEventType.PLAYER_POSITION_EVENT, onNewPlayerPositions);
        EventHandler.on(EEventType.PLAYER_LOAD_EVENT, onPlayerLoad);
    }
}