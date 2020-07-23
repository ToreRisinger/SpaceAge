import { ItemInfo } from "../shared/data/item/ItemInfo";
import { IItem } from "../shared/data/item/IItem";
import { SCharacter } from "./objects/SCharacter";
import { EStatType } from "../shared/data/stats/EStatType";

export module CargoUtils {

    let clientsWithUpdatedCargo : Map<number, SCharacter> = new Map();

    export function addItemToPlayerCargo(itemToAdd : IItem, character: SCharacter): boolean {
        let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(itemToAdd.itemType);
        let existingItems = character.getData().cargo.items;
        let containersLeft = character.getData().stats[EStatType.cargo_containers] - existingItems.length;
        let itemTypeExists = existingItems.filter(item => item.itemType == itemToAdd.itemType).length > 0;
        let canFit = (itemInfo.canStack && itemTypeExists) || containersLeft > 0;
        let totalSize = itemInfo.size * itemToAdd.quantity;

        if(totalSize > getCargoRemainingSize(character) || !canFit) {
            return false;
        }

        if(ItemInfo.getItemInfo(itemToAdd.itemType).canStack) {
            let foundItem = character.getData().cargo.items.find(existingItem => existingItem.itemType == itemToAdd.itemType);
            if(foundItem != undefined) {
                foundItem.quantity += itemToAdd.quantity;
            } else {
                character.getData().cargo.items.push(itemToAdd);
            }
        } else {
            character.getData().cargo.items.push(itemToAdd);
        }
        clientsWithUpdatedCargo.set(character.getData().id, character);
        return true;
    }

    export function getClientsWithChangedCargo() : Map<number, SCharacter> {
        return clientsWithUpdatedCargo;
    }

    export function clear() {
        clientsWithUpdatedCargo.clear();
    }

    export function getCargoUsedSize(character: SCharacter) : number {
        let cargoHoldSize = 0
        for(let i = 0; i < character.getData().cargo.items.length; i++) {
           let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(character.getData().cargo.items[i].itemType);
           cargoHoldSize += character.getData().cargo.items[i].quantity * itemInfo.size;
        }
        return cargoHoldSize;
    }

    export function getCargoRemainingSize(character: SCharacter): number {
        return getCargoTotalSize(character) - getCargoUsedSize(character);
    }

    export function getCargoTotalSize(character: SCharacter) : number {
        return character.getData().stats[EStatType.cargo_hold_size];
    }
}