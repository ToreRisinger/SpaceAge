import { EMineralItemType } from "./EMineralItemType";
import { ERefinedMineralItemType } from "./ERefinedMineralItemType";

export module MineralInfo {

    export interface IMineralInfo {
        rarity: number,
        refined: ERefinedMineralItemType,
        refineQuantity: number,
    }

    const mineralTypeToMineralInfoMap : { [key: number]: IMineralInfo } = {
        [EMineralItemType.IRON_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_IRON,
            refineQuantity: 10
        },
        [EMineralItemType.GOLD_ORE] : {
            rarity: 2,
            refined: ERefinedMineralItemType.REFINED_GOLD,
            refineQuantity: 10
        },
        [EMineralItemType.SILVER_ORE] : {
            rarity: 2,
            refined: ERefinedMineralItemType.REFINED_SILVER,
            refineQuantity: 10
        },
        [EMineralItemType.PLATINUM_ORE] : {
            rarity: 3,
            refined: ERefinedMineralItemType.REFINED_PLATINUM,
            refineQuantity: 10
        },
        [EMineralItemType.PALLADIUM_ORE] : {
            rarity: 3,
            refined: ERefinedMineralItemType.REFINED_PALLADIUM,
            refineQuantity: 10
        },
        [EMineralItemType.RHODIUM_ORE] : {
            rarity: 4,
            refined: ERefinedMineralItemType.REFINED_RHODIUM,
            refineQuantity: 10
        },
        [EMineralItemType.RUTHENIUM_ORE] : {
            rarity: 4,
            refined: ERefinedMineralItemType.REFINED_RUTHENIUM,
            refineQuantity: 10
        },
        [EMineralItemType.IRIDIUM_ORE] : {
            rarity: 5,
            refined: ERefinedMineralItemType.REFINED_IRIDIUM,
            refineQuantity: 10
        },
        [EMineralItemType.OSMIUM_ORE] : {
            rarity: 5,
            refined: ERefinedMineralItemType.REFINED_OSMIUM,
            refineQuantity: 10
        },

        [EMineralItemType.PROMETHIUM_ORE] : {
            rarity: 10,
            refined: ERefinedMineralItemType.REFINED_PROMEHIUM,
            refineQuantity: 10
        },
        [EMineralItemType.CERIUM_ORE] : {
            rarity: 11,
            refined: ERefinedMineralItemType.REFINED_CERIUM,
            refineQuantity: 10
        },
        [EMineralItemType.ERBIUM_ORE] : {
            rarity: 12,
            refined: ERefinedMineralItemType.REFINED_ERBIUM,
            refineQuantity: 10
        },
        [EMineralItemType.TERBIUM_ORE] : {
            rarity: 13,
            refined: ERefinedMineralItemType.REFINED_TERBIUM,
            refineQuantity: 10
        },


        [EMineralItemType.DYSPROSIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_DYSPROSIUM,
            refineQuantity: 10
        },
        [EMineralItemType.EUROPIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_EUROPIUM,
            refineQuantity: 10
        },
        [EMineralItemType.GADOLINIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_GADOLINIUM,
            refineQuantity: 10
        },
        [EMineralItemType.HOLMIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_HOLMIUM,
            refineQuantity: 10
        },
        [EMineralItemType.LANTHANUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_LANTHANUM,
            refineQuantity: 10
        },
        [EMineralItemType.LUTETIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_LUTETIUM,
            refineQuantity: 10
        },
        [EMineralItemType.NEODYMIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_NEODYMIUM,
            refineQuantity: 10
        },
        [EMineralItemType.PRASEODYMIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_PRASEODYMIUM,
            refineQuantity: 10
        },
        [EMineralItemType.SAMARIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_SAMARIUM,
            refineQuantity: 10
        },
        [EMineralItemType.SCANDIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_SCANDIUM,
            refineQuantity: 10
        },
        [EMineralItemType.THULIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_THULIUM,
            refineQuantity: 10
        },
        [EMineralItemType.YTTERBIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_YTTERBIUM,
            refineQuantity: 10
        },
        [EMineralItemType.YTTRIUM_ORE] : {
            rarity: 1,
            refined: ERefinedMineralItemType.REFINED_YTTRIUM,
            refineQuantity: 10
        },
    }

    export function getMineralInfo(mineralType : EMineralItemType) : IMineralInfo {
        return mineralTypeToMineralInfoMap[mineralType];
    }
}