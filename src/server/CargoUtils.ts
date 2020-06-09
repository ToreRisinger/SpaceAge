import { Items } from "../shared/scripts/Items";
import { SClient } from "./objects/SClient";

export module CargoUtils {

    let clientsWithUpdatedCargo : Map<number, SClient> = new Map();

    export function addItemToPlayerCargo(item : Items.IItem, client: SClient) {
        if(Items.getItemInfo(item.itemType).canStack) {
            let foundItem = client.getData().character.cargo.items.find(existingItem => existingItem.itemType == item.itemType);
            if(foundItem != undefined) {
                foundItem.quantity += item.quantity;
            }
        } else {
            client.getData().character.cargo.items.push(item);
        }
        clientsWithUpdatedCargo.set(client.getData().id, client);
    }

    export function getClientsWithChangedCargo() : Map<number, SClient> {
        return clientsWithUpdatedCargo;
    }

    export function clear() {
        clientsWithUpdatedCargo.clear();
    }

    export function getCargoSize(client: SClient) : number {
        let cargoHoldSize = 0
        for(let i = 0; i < client.getData().character.cargo.items.length; i++) {
           let itemInfo : Items.IItemInfo = Items.getItemInfo(client.getData().character.cargo.items[i].itemType);
           cargoHoldSize += client.getData().character.cargo.items[i].quantity * itemInfo.size;
        }
        return cargoHoldSize;
    }
}