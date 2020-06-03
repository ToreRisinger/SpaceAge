import { Events } from "../shared/scripts/Events";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { Sector } from "./Sector";
import { IClient } from "./interfaces/IClient";
import { ICargo } from "../shared/interfaces/ICargo";
import { ISector } from "../shared/interfaces/ISector";


export module PacketFactory {

    export function createPlayerLoadEventPacket(client: IClient, sectors : Array<Sector>, sectorId : number) {
        let sectorArray : Array<ISector> = new Array();
        for(let i = 0; i < sectors.length; i++) {
          sectorArray.push({
            id : sectors[i].getId(),
            x : sectors[i].getX(),
            y : sectors[i].getY(),
            name : sectors[i].getName()
          });
        }

        let packet : Events.INITAL_GAME_LOAD_EVENT_CONFIG = {
            eventId : Events.EEventType.INITAL_GAME_LOAD_EVENT,
            data : {
              ship : client.character.ship,
              cargo : client.character.cargo,
              sectors : sectorArray,
              clientSectorId : sectorId
            }
        }
    
        return packet;
    }

    export function createShipsUpdatePacket(clients : Map<number, IClient>) {
        let array: Array<{ship: ObjectInterfaces.IShip, characterName : string}> = [];
        clients.forEach((client: IClient, key: number) => {
          array.push({characterName: client.character.name, ship: client.character.ship});
        });
    
        let packet : Events.SHIPS_UPDATE_EVENT_CONFIG = {
          eventId : Events.EEventType.SHIPS_UPDATE_EVENT,
          data : {
            characters : array
          }
        }
        
        return packet;
    }

    export function createSkillStatePacket(client: IClient) {
      let packet : Events.SKILL_STATE_EVENT_CONFIG = {
        eventId : Events.EEventType.SKILL_STATE_EVENT,
        data : {
          skills: client.character.skills
        }
      }
      
      return packet;
  }

    export function createAsteroidsUpdatePacket(asteroids : Map<number, AsteroidData.IAsteroid>) {
      let asteroidArray: Array<AsteroidData.IAsteroid> = Array.from(asteroids.values());
  
      let packet : Events.ASTEROIDS_UPDATE_EVENT_CONFIG = {
        eventId : Events.EEventType.ASTEROIDS_UPDATE_EVENT,
        data : {
          asteroids : asteroidArray
        }
      }
      return packet;
  }

  export function createPlayerDisconnectedPacket(disconnectedShipId : number) {
    let packet : Events.PLAYER_DISCONNECTED_EVENT_CONFIG = {
      eventId : Events.EEventType.PLAYER_DISCONNECTED_EVENT,
      data : {
        shipId : disconnectedShipId
          
      }
    }

    return packet;
  }

  export function createCargoUpdatePacket(cargo : ICargo) {
    let packet : Events.CARGO_UPDATE_EVENT_CONFIG = {
      eventId : Events.EEventType.CARGO_UPDATE_EVENT,
      data : {
        cargo : cargo
      }
    }

    return packet;
  }

  export function createDestroyedGameObjectsPacket(objectsToDestroy : Array<number>) {
    let packet : Events.GAME_OBJECT_DESTOYED_EVENT_CONFIG = {
      eventId : Events.EEventType.GAME_OBJECT_DESTOYED_EVENT,
      data : {
        gameObjectIds : objectsToDestroy
      }
    }

    return packet;
  }

  export function createSectorChangedPacket(sectorId : number) {
    let packet : Events.CHANGE_SECTOR_EVENT_CONFIG = {
      eventId : Events.EEventType.CHANGE_SECTOR_EVENT,
      data : {
        clientSectorId : sectorId
      }
    }

    return packet;
  }
}