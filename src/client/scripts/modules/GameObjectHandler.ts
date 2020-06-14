import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events"
import { Ship } from "../game_objects/Ship";
import { GameObject } from "../game_objects/GameObject";
import { AsteroidData } from "../../../shared/scripts/AsteroidData";
import { Asteroid } from "../game_objects/Asteroid";
import { Sector } from "../game_objects/Sector";
import { GlobalDataService } from "./GlobalDataService";
import { ICharacter } from "../../../shared/interfaces/ICharacter";
import { ISector } from "../../../shared/interfaces/ISector";
import { SpaceStation } from "../game_objects/SpaceStation";
import { Planet } from "../game_objects/Planet";
import { MPlanet } from "./planet/MPlanet";
import { Utils } from "../../../shared/scripts/Utils";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();
    let planets = new Array<Planet>();

    export function init(character: ICharacter, sectors : Array<ISector>) {
        let newShip : Ship = new Ship(character, true, character.name);
        newShip.setCargo(character.cargo);
      
        thisShipId = character.id;
        gameObjects.set(thisShipId, newShip);

        sectors.forEach((value: ISector, index: number, array: ISector[]) => {
            gameObjects.set(value.id, new Sector(value));
        });

        subscribeToEvents();
    }

    export function init2() {
        MPlanet.getPlanets().forEach(planet => {
            let newPlanet : MPlanet.IPlanet = planet;
            planets.push(new Planet(newPlanet));
        });
    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update();
        });

        planets.forEach(planet => {
            planet.update();
        })
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
        event.data.characters.forEach(obj => {
            if(gameObjects.get(obj.character.id) == undefined) {
                let newShip : Ship = new Ship(obj.character, false, obj.character.name);
                gameObjects.set(obj.character.id, newShip);
            } else {
                //@ts-ignore
                let oldShip : Ship = gameObjects.get(obj.character.id);
                oldShip.updateDataObjectConfig(obj.character);
                if(obj.character.id == thisShipId) {
                    GlobalDataService.getInstance().setCharacter(obj.character);
                }
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

    function onSpaceStationUpdate(event: Events.SPACE_STATION_UPDATE_EVENT_CONFIG) {
        if(gameObjects.get(event.data.spaceStation.id) == undefined) {
            gameObjects.set(event.data.spaceStation.id, new SpaceStation(event.data.spaceStation));
        } else {
            //@ts-ignore
            gameObjects.get(event.data.spaceStation.id).updateDataObjectConfig(event.data.spaceStation);
        }
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
                    if(element.getData().id != thisShipId) {
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

    function onSkillStateChanged(event: Events.SKILL_STATE_EVENT_CONFIG) {
        GlobalDataService.getInstance().getCharacter().skills = event.data.skills;
        let eventToSend : Events.SKILL_STATE_UPDATED_EVENT_CONFIG = {
            eventId : Events.EEventType.SKILL_STATE_UPDATED_EVENT,
            data : { }
        }
        EventHandler.pushEvent(eventToSend); 
    }  

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.ASTEROIDS_UPDATE_EVENT, onAsteroidsUpdate);
        EventHandler.on(Events.EEventType.SPACE_STATION_UPDATE_EVENT, onSpaceStationUpdate);
        EventHandler.on(Events.EEventType.CARGO_UPDATE_EVENT, onCargoUpdate);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
        EventHandler.on(Events.EEventType.CHANGE_SECTOR_EVENT, onSectorChanged); 
        EventHandler.on(Events.EEventType.SKILL_STATE_EVENT, onSkillStateChanged);
          
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}