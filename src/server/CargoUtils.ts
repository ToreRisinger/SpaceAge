import { ItemInfo } from "../shared/data/item/ItemInfo";
import { SClient } from "./objects/SClient";
import { IItem } from "../shared/data/item/IItem";
import { SCharacter } from "./objects/SCharacter";

export module CargoUtils {

    let clientsWithUpdatedCargo : Map<number, SCharacter> = new Map();

    export function addItemToPlayerCargo(item : IItem, character: SCharacter) {
        if(ItemInfo.getItemInfo(item.itemType).canStack) {
            let foundItem = character.getData().cargo.items.find(existingItem => existingItem.itemType == item.itemType);
            if(foundItem != undefined) {
                foundItem.quantity += item.quantity;
            }
        } else {
            character.getData().cargo.items.push(item);
        }
        clientsWithUpdatedCargo.set(character.getData().id, character);
    }

    export function getClientsWithChangedCargo() : Map<number, SCharacter> {
        return clientsWithUpdatedCargo;
    }

    export function clear() {
        clientsWithUpdatedCargo.clear();
    }

    export function getCargoSize(character: SCharacter) : number {
        let cargoHoldSize = 0
        for(let i = 0; i < character.getData().cargo.items.length; i++) {
           let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(character.getData().cargo.items[i].itemType);
           cargoHoldSize += character.getData().cargo.items[i].quantity * itemInfo.size;
        }
        return cargoHoldSize;
    }
}