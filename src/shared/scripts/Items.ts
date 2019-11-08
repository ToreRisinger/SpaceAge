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
  
    export interface IModuleStat {
        property : ObjectInterfaces.EShipStatType,
        modifier : ObjectInterfaces.EShipStatModifier,
        value : number;
    }

    export interface IModule {
        quality : number,
        stats : Array<IModuleStat>
    }

    export interface IItem {
        itemType : EItemType
        quantity : number,
        module : IModule | undefined
    }

    export interface IItemInfo {
        //General properties
        image : string,
        name : string,
        description : string,
        canStack : boolean,
        sprite : ObjectInterfaces.ISprite | undefined,
    }

    const itemTypeToItemInfoMap : { [key: number]: IItemInfo } = {
        
        /*
            MODULES
        */
        [EItemType.MAIN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Main Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.SHIELD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Shield Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.ARMOR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Armor Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.ENGINE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Engine Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.RADAR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Radar Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.CARGO_HOLD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cargo Hold Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.TRACKING_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Tracking System Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.CLOAK_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cloak System Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.POWER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Power Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.SUPPORT_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Support Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.MINING_LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Mining Laser Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Laser Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.MISSLE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Missile Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.TURRET_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Turret Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EItemType.RAIL_GUN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Rail Gun Module",
            description: "Description",
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },

        /*
            MINERALS
        */

        [EItemType.TITANIUM] : {
            image : "assets/image/items/item_titanium.png",
            name: "TITANIUM",
            description: "Description",
            canStack: true,
            sprite : undefined
        },
        [EItemType.URANIUM] : {
            image : "assets/image/items/item_uranium.png",
            name: "Uranium",
            description: "Description",
            canStack: true,
            sprite : undefined
        },
        [EItemType.IRON] : {
            image : "assets/image/items/item_iron.png",
            name: "Iron",
            description: "Description",
            canStack: true,
            sprite : undefined
        },
        [EItemType.GOLD] : {
            image : "assets/image/items/item_gold.png",
            name: "Gold",
            description: "Description",
            canStack: true,
            sprite : undefined
        },
        [EItemType.DIAMOND] : {
            image : "assets/image/items/item_diamond.png",
            name: "DIAMOND",
            description: "Description",
            canStack: true,
            sprite : undefined
        }
    }

    export function getItemInfo(itemType : EItemType) : IItemInfo {
        return itemTypeToItemInfoMap[itemType];
    }
}