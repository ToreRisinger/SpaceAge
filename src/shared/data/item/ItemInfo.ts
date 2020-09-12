import { ISprite } from "../ISprite";
import { EModuleItemType } from "./EModuleItemType";
import { EMineralItemType } from "./EMineralItemType";
import { EItemType } from "./EItemType";
import { SPRITES } from "../../util/SPRITES";
import { ERefinedMineralItemType } from "./ERefinedMineralItemType";

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
        [EModuleItemType.SHIELD_GENERATION_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Shield Generation Module",
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
        [EModuleItemType.THRUST_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Thrust Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RADAR_RANGE_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Radar Range Module",
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
        [EModuleItemType.TARGET_DODGE_REDUCTION_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Target Dodge Reduction Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.RADAR_SIGNATURE_REDUCTION_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Radar Signature Reduction Module",
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
        [EModuleItemType.TURRET_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Laser Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.WEAPON_RANGE_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Weapon Range Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },
        [EModuleItemType.MINING_RANGE_MODULE] : {
            image : "assets/sprite/modules/ship_module.png",
            name: "Weapon Range Module",
            description: "Description",
            size: 20,
            cargoSpace : 1,
            canStack: false,
            sprite : SPRITES.SHIP_MODULE.sprite
        },

        /*
            MINERALS

            ORES
        */
        [EMineralItemType.IRON_ORE] : {
            image : "assets/image/items/item_iron_ore.png",
            name: "Iron Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.GOLD_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Gold Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.SILVER_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Silver Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.PLATINUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Platiunum Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        /*
        [EMineralItemType.PALLADIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Palladium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.RHODIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Rhodium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.RUTHENIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Ruthenium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.IRIDIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Iridium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.OSMIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Osmium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.CERIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Cerium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.DYSPROSIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Dysprosium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.ERBIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Ebrium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.EUROPIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Europium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.GADOLINIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Gadolinium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.HOLMIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Holmium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.LANTHANUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Lanthanum Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.LUTETIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Lutetium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.NEODYMIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Neodymium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.PRASEODYMIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Praseodymium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.PROMETHIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Promethium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.SAMARIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Samarium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.SCANDIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Scandium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.TERBIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Terbium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.THULIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Thulium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.YTTERBIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Ytterbium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [EMineralItemType.YTTRIUM_ORE] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Yttrium Ore",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        */

        /*
            REFINED
        */

        [ERefinedMineralItemType.REFINED_IRON] : {
            image : "assets/image/items/item_refined_iron.png",
            name: "Refined Iron",
            description: "Refined Iron can be used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_GOLD] : {
            image : "assets/image/items/item_refined_gold.png",
            name: "Refined Gold",
            description: "Refined Gold can be used as a building material",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },     
        [ERefinedMineralItemType.REFINED_SILVER] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Silver",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_PLATINUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Platiunum",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        /*
        [ERefinedMineralItemType.REFINED_PALLADIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Palladium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_RHODIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Rhodium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_RUTHENIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Ruthenium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_IRIDIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Iridium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_OSMIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Osmium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_CERIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Cerium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_DYSPROSIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Dysprosium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_ERBIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Ebrium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_EUROPIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Europium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_GADOLINIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Gadolinium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_HOLMIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Holmium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_LANTHANUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Lanthanum",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_LUTETIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Lutetium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_NEODYMIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Neodymium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_PRASEODYMIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Praseodymium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_PROMEHIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Promethium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_SAMARIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Samarium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_SCANDIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Scandium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_TERBIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Terbium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_THULIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Thulium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_YTTERBIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Ytterbium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        [ERefinedMineralItemType.REFINED_YTTRIUM] : {
            image : "assets/image/items/item_gold_ore.png",
            name: "Refined Yttrium",
            description: "description",
            size: 1,
            cargoSpace : 1,
            canStack: true,
            sprite : undefined
        },
        */
    }

    export function getItemInfo(itemType : EItemType) : IItemInfo {
        return itemTypeToItemInfoMap[itemType];
    }

    export function getItemQualityColor(quality : number) : string {
        if(quality > 85) {
            quality = 85;
        }
        let r = 170 + quality;
        let b = 170 + quality;
        return "rgb(" + r + ", 0, " + b + ")";
    }
}