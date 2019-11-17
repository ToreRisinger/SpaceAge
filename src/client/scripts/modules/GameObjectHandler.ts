import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "./GlobalData";
import { AsteroidData } from "../../../shared/scripts/AsteroidData";
import { Asteroid } from "../game_objects/Asteroid";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();
    let visibleGameObjects = new Map<number, GameObject>();

    export function init() {
        subscribeToInitialEvents();
    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update();
        });
    }

    export function getGameObjects() : Array<GameObject> {
        return Array.from(gameObjects.values());
    }

    function onInitialGameLoad(eventData : Events.INITAL_GAME_LOAD_EVENT_CONFIG) {
        let data : any = eventData.data;
        let ship : ObjectInterfaces.IShip = data.ship; 
        let newShip : Ship = new Ship(ship, true);
      
        thisShipId = ship.id;
        gameObjects.set(thisShipId, newShip);

        //@ts-ignore
        GlobalData.playerShip = gameObjects.get(thisShipId); 
        
        subscribeToEvents();
    }

    function onPlayerConnect(event : Events.GameEvent) {

    }

    function onPlayerDisconnect(event : Events.PLAYER_DISCONNECTED_EVENT_CONFIG) {
        destroyGameObject(event.data.shipId);
    }

    function onShipsUpdate(event : Events.SHIPS_UPDATE_EVENT_CONFIG) {
        let shipArray : Array<ObjectInterfaces.IShip> = event.data.ships;
        shipArray.forEach((ship_config: ObjectInterfaces.IShip) => {
            if(gameObjects.get(ship_config.id) == undefined) {
                let newShip : Ship = new Ship(ship_config, false);
                gameObjects.set(ship_config.id, newShip);
            } else {
                //@ts-ignore
                let oldShip : Ship = gameObjects.get(ship_config.id);
                oldShip.updateDataObjectConfig(ship_config);
            }
        });
    }

    function onAsteroidsUpdate(event : Events.ASTEROIDS_UPDATE_EVENT_CONFIG) {
        event.data.asteroids.forEach((asteroid: AsteroidData.IAsteroid) => {
            if(gameObjects.get(asteroid.id) == undefined) {
                gameObjects.set(asteroid.id, new Asteroid(asteroid));
            } else {
                //@ts-ignore
                gameObjects.get(asteroid.id).updateDataObjectConfig(asteroid);
            }
        });
    }

    function subscribeToInitialEvents() {
        EventHandler.on(Events.EEventType.INITAL_GAME_LOAD_EVENT, onInitialGameLoad);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.ASTEROIDS_UPDATE_EVENT, onAsteroidsUpdate);
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}