import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Items } from "../shared/scripts/Items";
import { IClient } from "./interfaces/IClient";

export module CargoUtils {

    let clientsWithUpdatedCargo : Map<number, IClient> = new Map();

    export function addItemToPlayerCargo(item : Items.IItem, client: IClient) {
        if(Items.getItemInfo(item.itemType).canStack) {
            let foundItem = client.character.cargo.items.find(existingItem => existingItem.itemType == item.itemType);
            if(foundItem != undefined) {
                foundItem.quantity += item.quantity;
            }
        } else {
            client.character.cargo.items.push(item);
        }
        clientsWithUpdatedCargo.set(client.id, client);
    }

    export function getClientsWithChangedCargo() : Map<number, IClient> {
        return clientsWithUpdatedCargo;
    }

    export function clear() {
        clientsWithUpdatedCargo.clear();
    }

    export function getCargoSize(client: IClient) : number {
        let cargoHoldSize = 0
        for(let i = 0; i < client.character.cargo.items.length; i++) {
           let itemInfo : Items.IItemInfo = Items.getItemInfo(client.character.cargo.items[i].itemType);
           cargoHoldSize += client.character.cargo.items[i].quantity * itemInfo.size;
        }
        return cargoHoldSize;
    }
}