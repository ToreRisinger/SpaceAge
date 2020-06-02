import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../../../shared/scripts/AsteroidData";
import { Asteroid } from "../game_objects/Asteroid";
import { Sector } from "../game_objects/Sector";
import { GlobalDataService } from "./GlobalDataService";
import { ICharacter } from "../../../shared/interfaces/ICharacter";
import { ISector } from "../../../shared/interfaces/ISector";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();

    export function init(character: ICharacter, sectors : Array<ISector>) {
        let newShip : Ship = new Ship(character.ship, true, character.name);
        newShip.setCargo(character.cargo);
      
        thisShipId = character.ship.id;
        gameObjects.set(thisShipId, newShip);

        sectors.forEach((value: ISector, index: number, array: ISector[]) => {
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
        let array : Array<{ship: ObjectInterfaces.IShip, characterName : string}> = event.data.characters;
        array.forEach((value : {ship: ObjectInterfaces.IShip, characterName : string}) => {
            if(gameObjects.get(value.ship.id) == undefined) {
                let newShip : Ship = new Ship(value.ship, false, value.characterName);
                gameObjects.set(value.ship.id, newShip);
            } else {
                //@ts-ignore
                let oldShip : Ship = gameObjects.get(value.ship.id);
                oldShip.updateDataObjectConfig(value.ship);
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