import { Events } from "../shared/scripts/Events";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { ICargo } from "../shared/interfaces/ICargo";
import { SClient } from "./objects/SClient";
import { ICharacter } from "../shared/interfaces/ICharacter";


export module PacketFactory {

    export function createShipsUpdatePacket(clients : Map<number, SClient>) {
        let array: Array<{character: ICharacter}> = [];
        clients.forEach((client: SClient, key: number) => {
          array.push({character: client.getCharacter().getData()});
        });
    
        let packet : Events.SHIPS_UPDATE_EVENT_CONFIG = {
          eventId : Events.EEventType.SHIPS_UPDATE_EVENT,
          data : {
            characters : array
          }
        }
        
        return packet;
    }

    export function createSkillStatePacket(client: SClient) {
      let packet : Events.SKILL_STATE_EVENT_CONFIG = {
        eventId : Events.EEventType.SKILL_STATE_EVENT,
        data : {
          skills: client.getCharacter().getData().skills
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