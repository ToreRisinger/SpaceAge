import { SPRITES } from "./SPRITES";
import { Items } from "./Items";
import { Stats } from "../stats/Stats";
import { ISprite } from "../interfaces/ISprite";

export module ShipModules {

    export interface ModuleStatGenerationConfig {
        stat: Stats.EStatType,
        modifier: Stats.EStatModifier,
        min : Array<number>,
        max : Array<number>,
    }

    export interface IModuleTypeProperties {
        base : Array<ModuleStatGenerationConfig>,
        possibleExtraStats : Array<ModuleStatGenerationConfig>
    }

    export interface IShipModuleInfo {
        sprite : ISprite,
        stats : IModuleTypeProperties
    }

    const moduleTypeToProperyMap : { [key: number]: IShipModuleInfo } = {
        /* MAIN MODULES */
        [Items.EModuleItemType.MAIN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.armor,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.thrust,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.cargo_hold,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.power,
                        max : [10, 15, 20, 25, 30],
                        min : [5, 10, 15, 20, 25],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* MODULES */
        [Items.EModuleItemType.CLOAK_SYSTEM_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.radar_signature_reduction,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.CARGO_HOLD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.cargo_hold,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.ENGINE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.thrust,
                        max : [21000, 32000, 43000, 54000, 65000],
                        min : [20000, 31000, 42000, 53000, 64000],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.POWER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.power,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.RADAR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.SHIELD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.shield_generation,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.shield,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.ARMOR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.armor,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.armor_impact_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.armor_heat_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.armor_explosion_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.SUPPORT_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.TRACKING_SYSTEM_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.target_dodge_reduction,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* WEAPON MODULES */
        [Items.EModuleItemType.LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.heat_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.MINING_LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mining_laser_strength,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mining_laser_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.MISSLE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.explosive_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.TURRET_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.normal_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [Items.EModuleItemType.RAIL_GUN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: Stats.EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                    {
                        stat: Stats.EStatType.impact_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : Stats.EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        }
    }

    export function getModuleInfo(moduleType : Items.EItemType) : IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}