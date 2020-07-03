import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/util/Events"
import { CCharacter } from "../game_objects/CCharacter";
import { GameObject } from "../game_objects/GameObject";
import { Asteroid } from "../game_objects/Asteroid";
import { CSector } from "../game_objects/CSector";
import { GlobalDataService } from "./GlobalDataService";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { SpaceStation } from "../game_objects/SpaceStation";
import { Planet } from "../game_objects/Planet";
import { PlanetInfo } from "../../../shared/data/planet/PlanetInfo";
import { ISector } from "../../../shared/data/sector/ISector";
import { IPlanet } from "../../../shared/data/planet/IPlanet";
import { IAsteroid } from "../../../shared/data/astroid/IAstroid";
import { CNpc } from "../game_objects/CNpc";
import { CContainer } from "../game_objects/CContainer";
import { CSceneObject } from "../game_objects/CSceneObject";

export module GameObjectHandler {

    let thisShipId : number = -1;
    let gameObjects = new Map<number, GameObject>();
    let planets = new Array<Planet>();

    export function init(character: ICharacter, sectors : Array<ISector>, thisSector: ISector) {
        let newShip : CCharacter = new CCharacter(character, true);
        newShip.setCargo(character.cargo);
      
        thisShipId = character.id;
        gameObjects.set(thisShipId, newShip);

        sectors.forEach((value: ISector, index: number, array: ISector[]) => {
            gameObjects.set(value.id, new CSector(value, thisSector));
        });

        subscribeToEvents();
    }

    export function init2() {
        PlanetInfo.getPlanets().forEach(planet => {
            let newPlanet : IPlanet = planet;
            planets.push(new Planet(newPlanet));
        });
    }

    export function update(time : number, delta : number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.update(time, delta);
        });

        planets.forEach(planet => {
            planet.update(time, delta);
        })
    }

    export function updateGraphics(time: number, delta: number) {
        gameObjects.forEach((object: GameObject, key: number) => {
            object.updateGraphics(time, delta);
        });

        planets.forEach(planet => {
            planet.updateGraphics(time, delta);
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
                let newShip : CCharacter = new CCharacter(obj.character, false);
                gameObjects.set(obj.character.id, newShip);
            } else {
                //@ts-ignore
                let oldShip : CCharacter = gameObjects.get(obj.character.id);
                oldShip.updateData(obj.character);
                if(obj.character.id == thisShipId) {
                    GlobalDataService.getInstance().setCharacter(obj.character);
                }
            }
        });

        event.data.npcs.forEach(obj => {
            if(gameObjects.get(obj.npc.id) == undefined) {
                let newNpc : CNpc = new CNpc(obj.npc);
                gameObjects.set(obj.npc.id, newNpc);
            } else {
                //@ts-ignore
                let oldNpc : CNpc = gameObjects.get(obj.npc.id);
                oldNpc.updateData(obj.npc);
            }
        });
    }

    function onAsteroidsUpdate(event : Events.ASTEROIDS_UPDATE_EVENT_CONFIG) {
        event.data.asteroids.forEach((asteroid: IAsteroid) => {
            if(gameObjects.get(asteroid.id) == undefined) {
                gameObjects.set(asteroid.id, new Asteroid(asteroid));
            } else {
                //@ts-ignore
                gameObjects.get(asteroid.id).updateData(asteroid);
            }
        });
    }

    function onSpaceStationUpdate(event: Events.SPACE_STATION_UPDATE_EVENT_CONFIG) {
        if(gameObjects.get(event.data.spaceStation.id) == undefined) {
            gameObjects.set(event.data.spaceStation.id, new SpaceStation(event.data.spaceStation));
        } else {
            //@ts-ignore
            gameObjects.get(event.data.spaceStation.id).updateData(event.data.spaceStation);
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
        if(gameObject instanceof CSector) {
            GlobalDataService.getInstance().setSector(gameObject)
            let newSectorPos = GlobalDataService.getInstance().getSector().getMapPos();
            let objectsToRemove : Array<GameObject> = new Array();
            gameObjects.forEach((element, key) => {
                if(element instanceof CSector) {
                    element.onSectorChanged(newSectorPos.x, newSectorPos.y);
                } else if(element instanceof CCharacter) {
                    if(element.getId() != thisShipId) {
                        objectsToRemove.push(element);
                    }
                } else {
                    objectsToRemove.push(element);
                }
            });
            for(let i = 0; i < objectsToRemove.length; i++) {
                destroyGameObject(objectsToRemove[i].getId());
            }
            planets.forEach(planet => {
                planet.onSectorChanged(newSectorPos.x, newSectorPos.y);
            })
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

    function onContainerUpdate(event: Events.CONTAINER_UPDATE_EVENT_CONFIG) {
        event.data.containers.forEach(container => {
            if(gameObjects.get(container.id) == undefined) {
                gameObjects.set(container.id, new CContainer(container));
            } else {
                //@ts-ignore
                gameObjects.get(container.id).updateData(container);
            }
        });
    }

    function onSceneObjectUpdate(event: Events.SCENE_OBJECT_UPDATE_EVENT_CONFIG) {
        event.data.sceneObjects.forEach(obj => {
            if(gameObjects.get(obj.id) == undefined) {
                gameObjects.set(obj.id, new CSceneObject(obj));
            } else {
                //@ts-ignore
                gameObjects.get(obj.id).updateData(obj);
            }
        });
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_CONNECTED_EVENT, onPlayerConnect);
        EventHandler.on(Events.EEventType.PLAYER_DISCONNECTED_EVENT, onPlayerDisconnect);
        EventHandler.on(Events.EEventType.SHIPS_UPDATE_EVENT, onShipsUpdate);
        EventHandler.on(Events.EEventType.ASTEROIDS_UPDATE_EVENT, onAsteroidsUpdate);
        EventHandler.on(Events.EEventType.SPACE_STATION_UPDATE_EVENT, onSpaceStationUpdate);
        EventHandler.on(Events.EEventType.CONTAINER_UPDATE_EVENT, onContainerUpdate);
        EventHandler.on(Events.EEventType.CARGO_UPDATE_EVENT, onCargoUpdate);
        EventHandler.on(Events.EEventType.GAME_OBJECT_DESTOYED_EVENT, onGameObjectsDestroyed);
        EventHandler.on(Events.EEventType.CHANGE_SECTOR_EVENT, onSectorChanged); 
        EventHandler.on(Events.EEventType.SKILL_STATE_EVENT, onSkillStateChanged); 
        EventHandler.on(Events.EEventType.SCENE_OBJECT_UPDATE_EVENT, onSceneObjectUpdate);  
    }

    function destroyGameObject(objectId : number) {
        let object : GameObject | undefined = gameObjects.get(objectId);
        if(object != undefined) {
            object.destroy();
            gameObjects.delete(objectId);
        }
    }
}