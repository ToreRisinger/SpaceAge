import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";

export module Items {

    export enum EModuleItemType {
        //Main modules
        MAIN_MODULE = 0,
    
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
    }

    export enum EMineralItemType {
       TITANIUM_ORE = 15,
       URANIUM_ORE,
       IRON_ORE,
       GOLD_ORE,
       DIAMOND_ORE
    }

    export type EItem = EModuleItemType | EMineralItemType;
  
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
        itemType : EItem
        quantity : number,
        module : IModule | undefined
    }

    export interface IItemInfo {
        //General properties
        image : string,
        name : string,
        description : string,
        cargoSpace : number,
        canStack : boolean,
        sprite : ObjectInterfaces.ISprite | undefined,
    }

    const itemTypeToItemInfoMap : { [key: number]: IItemInfo } = {
        
        /*
            MODULES
        */
        [EModuleItemType.MAIN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Main Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.SHIELD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Shield Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.ARMOR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Armor Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.ENGINE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Engine Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RADAR_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Radar Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.CARGO_HOLD_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cargo Hold Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.TRACKING_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Tracking System Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.CLOAK_SYSTEM_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Cloak System Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.POWER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Power Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.SUPPORT_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Support Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.MINING_LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Mining Laser Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.LASER_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Laser Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.MISSLE_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Missile Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.TURRET_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Turret Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RAIL_GUN_MODULE] : {
            image : "assets\sprite\modules\ship_module.png",
            name: "Rail Gun Module",
            description: "Description",
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },

        /*
            MINERALS
        */

        [EMineralItemType.TITANIUM_ORE] : {
            image : "assets/image/items/item_titanium_ore.png",
            name: "TITANIUM",
            description: "Description",
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.URANIUM_ORE] : {
            image : "assets/image/items/item_uranium_ore.png",
            name: "Uranium",
            description: "Description",
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.IRON_ORE] : {
            image : "assets/image/items/item_iron_ore.png",
            name: "Iron",
            description: "Description",
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.GOLD_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Gold",
            description: "Description",
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.DIAMOND_ORE] : {
            image : "assets/image/items/item_diamond_ore.png",
            name: "DIAMOND",
            description: "Description",
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        }
    }

    export function getItemInfo(itemType : EItem) : IItemInfo {
        return itemTypeToItemInfoMap[itemType];
    }
}