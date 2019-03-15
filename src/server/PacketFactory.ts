import { Events } from "../shared/scripts/Events";
import { DataObjects } from "../shared/scripts/DataObjects";


export module PacketFactory {

    export function createPlayerLoadEventPacket(ship : DataObjects.Ship_Config) {
        let packet : Events.INITAL_GAME_LOAD_EVENT_CONFIG = {
            eventId : Events.EEventType.INITAL_GAME_LOAD_EVENT,
            data : {
            ship : ship
            }
        }
    
        return packet;
    }

    export function createShipsUpdatePacket(PLAYERS :  Map<number, DataObjects.Player>) {
        let shipArray: Array<DataObjects.Ship_Config> = [];
        PLAYERS.forEach((player: DataObjects.Player, key: number) => {
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

    export function createPlayerDisconnectedPacket(disconnectedShipId : number) {
        return {shipId : disconnectedShipId};
    }

}