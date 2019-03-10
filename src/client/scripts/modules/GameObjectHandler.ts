import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { Camera } from "./Camera";
import { DataObjects } from "../../../shared/scripts/DataObjects";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();

    export function init() {
        subscribeToInitialEvents();
    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update();
        });
        
    }

    export function getShip() {
        return gameObjects.get(thisShipId);
    }

    function onInitialGameLoad(eventData : Events.INITAL_GAME_LOAD_EVENT_CONFIG) {
        let data : any = eventData.data;
        let ship : DataObjects.Ship_Config = data.ship; 
        let newShip : Ship = new Ship(ship);
      
        thisShipId = ship.id;
        gameObjects.set(thisShipId, newShip);
        //@ts-ignore
        gameObjects.get(thisShipId).setToThisPlayerShip();
        Camera.centerCamera(true);

        subscribeToEvents();
    }

    function onPlayerConnect(event : Events.GameEvent) {

    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        destroyGameObject(event.data.shipId);
    }

    function onShipsUpdate(event : Events.SHIPS_UPDATE_EVENT_CONFIG) {
        let shipArray : Array<DataObjects.Ship_Config> = event.data.ships;
        shipArray.forEach((ship_config: DataObjects.Ship_Config) => {
            if(gameObjects.get(ship_config.id) == undefined) {
                let newShip : Ship = new Ship(ship_config);
                gameObjects.set(ship_config.id, newShip);
            } else {
                //@ts-ignore
                let oldShip : Ship = gameObjects.get(ship_config.id);
                oldShip.updateDataObjectConfig(ship_config);
            }
        });
    }

    function onNewShipDestination(event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {

    }

    function subscribeToInitialEvents() {
        //EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        //EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        //EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.INITAL_GAME_LOAD_EVENT, onInitialGameLoad);
        //EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onNewShipDestination);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
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