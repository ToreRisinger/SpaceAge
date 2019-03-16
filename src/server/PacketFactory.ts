import { Events } from "../shared/scripts/Events";
import { DataObjects } from "../shared/scripts/ObjectInterfaces";


export module PacketFactory {

    export function createPlayerLoadEventPacket(ship : DataObjects.IShip) {
        let packet : Events.INITAL_GAME_LOAD_EVENT_CONFIG = {
            eventId : Events.EEventType.INITAL_GAME_LOAD_EVENT,
            data : {
            ship : ship
            }
        }
    
        return packet;
    }

    export function createShipsUpdatePacket(PLAYERS :  Map<number, DataObjects.IPlayer>) {
        let shipArray: Array<DataObjects.IShip> = [];
        PLAYERS.forEach((player: DataObjects.IPlayer, key: number) => {
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