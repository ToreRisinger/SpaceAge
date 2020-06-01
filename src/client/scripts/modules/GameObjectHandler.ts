import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../../../shared/scripts/AsteroidData";
import { Asteroid } from "../game_objects/Asteroid";
import { Sector } from "../game_objects/Sector";
import { Sectors } from "../../../shared/scripts/Sectors";
import { GlobalDataService } from "./GlobalDataService";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();

    export function init(ship : ObjectInterfaces.IShip, cargo : ObjectInterfaces.ICargo, sectors : Array<Sectors.ISector>) {
        let newShip : Ship = new Ship(ship, true);
        newShip.setCargo(cargo);
      
        thisShipId = ship.id;
        gameObjects.set(thisShipId, newShip);

        sectors.forEach((value: Sectors.ISector, index: number, array: Sectors.ISector[]) => {
            gameObjects.set(value.id, new Sector(value));
        });
        
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update();
        });
    }

    export function getGameObjects() : Array<GameObject> {
        return Array.from(gameObjects.values());
    }

    export function getGameObjectsMap() :  Map<number, GameObject> {
        return gameObjects;
    }

    export function getPlayerShip() {
        return gameObjects.get(thisShipId);
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

    function onCargoUpdate(event : Events.CARGO_UPDATE_EVENT_CONFIG) {
        GlobalDataService.getInstance().getPlayerShip().setCargo(event.data.cargo);
        let eventToSend : Events.PLAYER_CARGO_UPDATED_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_CARGO_UPDATED_EVENT,
            data : { }
        }
        EventHandler.pushEvent(eventToSend); 
    }

    function onGameObjectsDestroyed(event : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG) {
        event.data.gameObjectIds.forEach(gameObjectId => {
            let gameObject = gameObjects.get(gameObjectId);
            if(gameObject != undefined) {
                gameObject.destroy();
                gameObjects.delete(gameObjectId);
            }
        });
    }

    function onSectorChanged(event : Events.CHANGE_SECTOR_EVENT_CONFIG) {
        //@ts-ignore
        let gameObject = gameObjects.get(event.data.clientSectorId);
        if(gameObject instanceof Sector) {
            GlobalDataService.getInstance().setSector(gameObject)
            let newSectorX = GlobalDataService.getInstance().getSector().getMapX();
            let newSectorY = GlobalDataService.getInstance().getSector().getMapY();
            let objectsToRemove : Array<GameObject> = new Array();
            gameObjects.forEach((element, key) => {
                if(element instanceof Sector) {
                    element.onSectorChanged(newSectorX, newSectorY);
                } else if(element instanceof Ship) {
                    if(element.getShipData().id != thisShipId) {
                        objectsToRemove.push(element);
                    }
                } else {
                    objectsToRemove.push(element);
                }
            });
            for(let i = 0; i < objectsToRemove.length; i++) {
                destroyGameObject(objectsToRemove[i].getGameObjectData().id);
            }
        }  
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.ASTEROIDS_UPDATE_EVENT, onAsteroidsUpdate);
        EventHandler.on(Events.EEventType.CARGO_UPDATE_EVENT, onCargoUpdate);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
        EventHandler.on(Events.EEventType.CHANGE_SECTOR_EVENT, onSectorChanged);      
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}