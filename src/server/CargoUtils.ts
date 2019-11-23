import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Items } from "../shared/scripts/Items";

export module CargoUtils {

    let playersWithUpdatedCargo : Map<number, ObjectInterfaces.IPlayer> = new Map();

    export function addItemToPlayerCargo(item : Items.IItem, player : ObjectInterfaces.IPlayer) {
        if(Items.getItemInfo(item.itemType).canStack) {
            let foundItem = player.cargo.items.find(existingItem => existingItem.itemType == item.itemType);
            if(foundItem != undefined) {
                foundItem.quantity += item.quantity;
            }
        } else {
            player.cargo.items.push(item);
        }
        playersWithUpdatedCargo.set(player.playerId, player);
    }

    export function getPlayersWithChangedCargo() : Map<number, ObjectInterfaces.IPlayer> {
        return playersWithUpdatedCargo;
    }

    export function clear() {
        playersWithUpdatedCargo.clear();
    }

    export function getCargoSize(player : ObjectInterfaces.IPlayer) : number {
        let cargoHoldSize = 0
        for(let i = 0; i < player.cargo.items.length; i++) {
           let itemInfo : Items.IItemInfo = Items.getItemInfo(player.cargo.items[i].itemType);
           cargoHoldSize += player.cargo.items[i].quantity * itemInfo.size;
        }
        return cargoHoldSize;
    }
}