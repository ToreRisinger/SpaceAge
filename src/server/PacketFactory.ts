import { Events } from "../shared/scripts/Events";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { Sector } from "./Sector";
import { Sectors } from "../shared/scripts/Sectors";
import { IdHandler } from "./IdHandler";


export module PacketFactory {

    export function createPlayerLoadEventPacket(player : ObjectInterfaces.IPlayer, sectors : Array<Sector>, sectorId : number) {
        let sectorArray : Array<Sectors.ISector> = new Array();
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
              ship : player.ship,
              cargo : player.cargo,
              sectors : sectorArray,
              clientSectorId : sectorId
            }
        }
    
        return packet;
    }

    export function createShipsUpdatePacket(players : Map<number, ObjectInterfaces.IPlayer>) {
        let shipArray: Array<ObjectInterfaces.IShip> = [];
        players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
          shipArray.push(player.ship);
        });
    
        let packet : Events.SHIPS_UPDATE_EVENT_CONFIG = {
          eventId : Events.EEventType.SHIPS_UPDATE_EVENT,
          data : {
            ships : shipArray
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

  export function createCargoUpdatePacket(cargo : ObjectInterfaces.ICargo) {
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
}