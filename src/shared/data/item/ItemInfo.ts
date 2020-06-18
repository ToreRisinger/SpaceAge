import { ISprite } from "../ISprite";
import { EModuleItemType } from "./EModuleItemType";
import { EMineralItemType } from "./EMineralItemType";
import { EItemType } from "./EItemType";
import { SPRITES } from "../../util/SPRITES";

export module ItemInfo {

    export interface IItemInfo {
        //General properties
        image : string,
        name : string,
        description : string,
        size : number,
        cargoSpace : number,
        canStack : boolean,
        sprite : ISprite | undefined,
    }

    const itemTypeToItemInfoMap : { [key: number]: IItemInfo } = {
        
        /*
            MODULES
        */
        [EModuleItemType.MAIN_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Main Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.SHIELD_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Shield Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.ARMOR_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Armor Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.ENGINE_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Engine Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RADAR_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Radar Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.CARGO_HOLD_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Cargo Hold Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.TRACKING_SYSTEM_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Tracking System Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.CLOAK_SYSTEM_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Cloak System Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.POWER_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Power Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.SUPPORT_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Support Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.MINING_LASER_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Mining Laser Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.LASER_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Laser Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.MISSLE_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Missile Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.TURRET_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Turret Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RAIL_GUN_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Rail Gun Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },

        /*
            MINERALS
        */

        [EMineralItemType.TITANIUM_ORE] : {
            image : "assets/image/items/item_titanium_ore.png",
            name: "Titanium Ore",
            description: "Titanium Ore can be refined into Refined Titanium and used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.URANIUM_ORE] : {
            image : "assets/image/items/item_uranium_ore.png",
            name: "Uranium Ore",
            description: "Uranium Ore can be refined into Refined Uranium and used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.IRON_ORE] : {
            image : "assets/image/items/item_iron_ore.png",
            name: "Iron Ore",
            description: "Iron Ore can be refined into Refined Iron and used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.GOLD_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Gold Ore",
            description: "Gold Ore can be refined into Refined Gold and used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.DIAMOND_ORE] : {
            image : "assets/image/items/item_diamond_ore.png",
            name: "Diamond Ore",
            description: "Diamond Ore can be refined into Refined Diamond and used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        }
    }

    export function getItemInfo(itemType : EItemType) : IItemInfo {
        return itemTypeToItemInfoMap[itemType];
    }

    export function getItemQualityColor(quality : number) : string {
        switch(quality) {
            case 1 :
                return "White";
            case 2 :
                return "DeepSkyBlue";
            case 3 :
                return "LimeGreen";
            case 4 :
                return "Orchid";
            case 5 :
                return "Orange";
            default :
                return "";
        }
    }
}