import { Events } from "../shared/scripts/Events";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { AsteroidData } from "../shared/scripts/AsteroidData";


export module PacketFactory {

    export function createPlayerLoadEventPacket(player : ObjectInterfaces.IPlayer) {
        let packet : Events.INITAL_GAME_LOAD_EVENT_CONFIG = {
            eventId : Events.EEventType.INITAL_GAME_LOAD_EVENT,
            data : {
              ship : player.ship
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
}