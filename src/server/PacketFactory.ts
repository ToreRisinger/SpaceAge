import { Events } from "../shared/util/Events";
import { ICargo } from "../shared/data/ICargo";
import { SClient } from "./objects/SClient";
import { ICharacter } from "../shared/data/gameobject/ICharacter";
import { IAsteroid } from "../shared/data/astroid/IAstroid";
import { INpc } from "../shared/data/npc/INpc";
import { SNpc } from "./objects/npc/SNpc";
import { IContainer } from "../shared/data/gameobject/IContainer";
import { IPlayerCargoPair } from "./sector/SSector";


export module PacketFactory {

    export function createShipsUpdatePacket(clients : Map<number, SClient>, npcs: Map<number, SNpc>) {
        let characterArray: Array<{character: ICharacter}> = [];
        clients.forEach((client: SClient, key: number) => {
          characterArray.push({character: client.getCharacter().getData()});
        });

        let npcArray: Array<{npc: INpc}> = [];
        npcs.forEach((npc: SNpc, key: number) => {
          npcArray.push({npc: npc.getData()});
        });
    
        let packet : Events.SHIPS_UPDATE_EVENT_CONFIG = {
          eventId : Events.EEventType.SHIPS_UPDATE_EVENT,
          data : {
            characters : characterArray,
            npcs: npcArray
          }
        }
        
        return packet;
    }

    export function createContainerPacket(clients : Map<number, SClient>, containers: Map<number, IPlayerCargoPair>) {
      let list: Array<IContainer> = Array.from(containers.values()).map(obj => obj.cargo);
      let packet: Events.CONTAINER_UPDATE_EVENT_CONFIG = {
        eventId: Events.EEventType.CONTAINER_UPDATE_EVENT,
        data: {
          containers: list
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

    export function createAsteroidsUpdatePacket(asteroids : Map<number, IAsteroid>) {
      let asteroidArray: Array<IAsteroid> = Array.from(asteroids.values());
  
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