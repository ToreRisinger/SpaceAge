import { ISprite } from "../ISprite";
import { IModuleTypeProperties } from "./IModuleTypeProperties";
import { EModuleItemType } from "../item/EModuleItemType";
import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";
import { EItemType } from "../item/EItemType";
import { SPRITES } from "../../util/SPRITES";
import { ERefinedMineralItemType } from "../item/ERefinedMineralItemType";

export module ShipModuleInfo {

    export interface IShipModuleMineralInfo {
        mineral: ERefinedMineralItemType,
        base: number,
        increase: number
    }

    export interface IShipModuleInfo {
        sprite: ISprite,
        stats: IModuleTypeProperties,
        minerals: Array<IShipModuleMineralInfo>,
        requireStat: EStatType
    }

    const moduleTypeToProperyMap : { [key: number]: IShipModuleInfo } = {
        /* MAIN MODULES */
        [EModuleItemType.MAIN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.armor,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.thrust,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_range,
                        baseMax : 2000,
                        baseMin : 1000,
                        increase: 1000,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_damage,
                        baseMax : 10,
                        baseMin : 5,
                        increase: 5,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_yield,
                        baseMax : 2,
                        baseMin : 1,
                        increase: 1,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_range,
                        baseMax : 1000,
                        baseMin : 500,
                        increase: 500,
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_range,
                        baseMax: 1000,
                        baseMin: 500,
                        increase: 500,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.cargo_hold_size,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.power,
                        baseMax: 10,
                        baseMin: 5,
                        increase: 5,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.main_module_quality
        },

        /* MODULES */
        [EModuleItemType.RADAR_SIGNATURE_REDUCTION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_signature_reduction,
                        baseMax: 2,
                        baseMin: 1,
                        increase: 1,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.radar_range_module_quality
        },
        [EModuleItemType.CARGO_HOLD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.cargo_hold_size,
                        baseMax: 100,
                        baseMin: 50,
                        increase: 50,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.cargo_hold_module_quality
        },
        [EModuleItemType.THRUST_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.thrust,
                        baseMax: 21000,
                        baseMin: 20000,
                        increase: 10000,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.thrust_module_quality
        },
        [EModuleItemType.POWER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.power,
                        baseMax: 2,
                        baseMin: 1,
                        increase: 1,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.power_module_quality
        },
        [EModuleItemType.RADAR_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_range,
                        baseMax: 2000,
                        baseMin: 1000,
                        increase: 1000,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.radar_range_module_quality
        },
        [EModuleItemType.WEAPON_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_range,
                        baseMax: 2000,
                        baseMin: 1000,
                        increase: 1000,
                        modifier: EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.weapon_range_module_quality
        },
        [EModuleItemType.MINING_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_range,
                        baseMax: 2000,
                        baseMin: 1000,
                        increase: 1000,
                        modifier: EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.mining_laser_module_quality
        },
        [EModuleItemType.SHIELD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield_generation,
                        baseMax: 2,
                        baseMin: 1,
                        increase: 1,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield,
                        baseMax: 200,
                        baseMin: 100,
                        increase: 100,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.shield_module_quality
        },
        [EModuleItemType.SHIELD_GENERATION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield_generation,
                        baseMax: 10,
                        baseMin: 5,
                        increase: 5,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.shield_generation_module_quality
        },
        [EModuleItemType.ARMOR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.armor,
                        baseMax: 200,
                        baseMin: 100,
                        increase: 100,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.armor_module_quality
        },
        [EModuleItemType.SUPPORT_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats: []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.support_module_quality
        },
        [EModuleItemType.TARGET_DODGE_REDUCTION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.target_dodge_reduction,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats: []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.target_dodge_reduction_module_quality
        },
        /* WEAPON MODULES */
        [EModuleItemType.MINING_LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_yield,
                        baseMax: 2,
                        baseMin: 1,
                        increase: 1,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_range,
                        baseMax: 200,
                        baseMin: 100,
                        increase: 100,
                        modifier: EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.mining_laser_module_quality
        },
        [EModuleItemType.TURRET_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_damage,
                        baseMax: 20,
                        baseMin: 10,
                        increase: 10,
                        modifier: EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            },
            minerals: [
                {
                    mineral: ERefinedMineralItemType.REFINED_IRON,
                    base: 10,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_GOLD,
                    base: 5,
                    increase: 1
                },
                {
                    mineral: ERefinedMineralItemType.REFINED_SILVER,
                    base: 5,
                    increase: 1
                },
            ],
            requireStat: EStatType.turret_module_quality
        }
    }

    export function getModuleInfo(moduleType : EItemType) : IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}