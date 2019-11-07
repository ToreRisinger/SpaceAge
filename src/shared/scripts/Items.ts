import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";


export module Items {

    export enum EItemType {
        /*
            MODULES
        */

        //Main modules
        MAIN_MODULE,
    
        //Modules
        SHIELD_MODULE,
        ARMOR_MODULE,
        ENGINE_MODULE,
        RADAR_MODULE,
        CARGO_HOLD_MODULE,
        TRACKING_SYSTEM_MODULE,
        CLOAK_SYSTEM_MODULE,
        POWER_MODULE,
        SUPPORT_MODULE,
    
        //Weapon modules
        MINING_LASER_MODULE,
        LASER_MODULE,
        MISSLE_MODULE,
        TURRET_MODULE,
        RAIL_GUN_MODULE,

        /*
            MINERALS
        */

        TITANIUM,
        URANIUM,
        IRON,
        GOLD,
        DIAMOND
    }

    export interface IItem {
        itemType : EItemType
    }

    export interface IItemStock extends IItem {
        amount : number
    }

    export interface IItemInfo {
        image : string,
        name : string,
        description : string
    }

    const itemTypeToItemInfoMap : { [key: number]: IItemInfo } = {
        
        /*
            MODULES
        */

        [EItemType.MAIN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Main Module",
            description: "Description"
        },
        [EItemType.SHIELD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Shield Module",
            description: "Description"
        },
        [EItemType.ARMOR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Armor Module",
            description: "Description"
        },
        [EItemType.ENGINE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Engine Module",
            description: "Description"
        },
        [EItemType.RADAR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Radar Module",
            description: "Description"
        },
        [EItemType.CARGO_HOLD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cargo Hold Module",
            description: "Description"
        },
        [EItemType.TRACKING_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Tracking System Module",
            description: "Description"
        },
        [EItemType.CLOAK_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cloak System Module",
            description: "Description"
        },
        [EItemType.POWER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Power Module",
            description: "Description"
        },
        [EItemType.SUPPORT_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Support Module",
            description: "Description"
        },
        [EItemType.MINING_LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Mining Laser Module",
            description: "Description"
        },
        [EItemType.LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Laser Module",
            description: "Description"
        },
        [EItemType.MISSLE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Missile Module",
            description: "Description"
        },
        [EItemType.TURRET_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Turret Module",
            description: "Description"
        },
        [EItemType.RAIL_GUN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Rail Gun Module",
            description: "Description"
        },

        /*
            MINERALS
        */

        [EItemType.TITANIUM] : {
            image : "assets/image/items/item_titanium.png",
            name: "TITANIUM",
            description: "Description"
        },
        [EItemType.URANIUM] : {
            image : "assets/image/items/item_uranium.png",
            name: "Uranium",
            description: "Description"
        },
        [EItemType.IRON] : {
            image : "assets/image/items/item_iron.png",
            name: "Iron",
            description: "Description"
        },
        [EItemType.GOLD] : {
            image : "assets/image/items/item_gold.png",
            name: "Gold",
            description: "Description"
        },
        [EItemType.DIAMOND] : {
            image : "assets/image/items/item_diamond.png",
            name: "DIAMOND",
            description: "Description"
        }
    }

    export function getModuleInfo(itemType : EItemType) : IItemInfo {
        return itemTypeToItemInfoMap[itemType];
    }
}