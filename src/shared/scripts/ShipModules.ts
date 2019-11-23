import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";
import { Items } from "./Items";

export module ShipModules {

    export interface ModuleStatGenerationConfig {
        stat : ObjectInterfaces.EShipStatType,
        modifier : ObjectInterfaces.EShipStatModifier,
        min : Array<number>,
        max : Array<number>,
    }

    export interface IModuleTypeProperties {
        base : Array<ModuleStatGenerationConfig>,
        possibleExtraStats : Array<ModuleStatGenerationConfig>
    }

    export interface IShipModuleInfo {
        sprite : ObjectInterfaces.ISprite,
        stats : IModuleTypeProperties
    }

    const moduleTypeToProperyMap : { [key: number]: IShipModuleInfo } = {
        /* MAIN MODULES */
        [Items.EModuleItemType.MAIN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.armor,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.thrust,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.cargo_hold,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.power,
                        max : [10, 15, 20, 25, 30],
                        min : [5, 10, 15, 20, 25],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.radar_signature_reduction,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.cargo_hold,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.thrust,
                        max : [11000, 12000, 13000, 14000, 15000],
                        min : [10000, 11000, 12000, 13000, 14000],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.power,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.shield_generation,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.shield,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.armor,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.armor_impact_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.armor_heat_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.armor_explosion_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.target_dodge_reduction,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.heat_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mining_laser_strength,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mining_laser_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.explosive_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.normal_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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
                        stat: ObjectInterfaces.EShipStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
                    },
                    {
                        stat: ObjectInterfaces.EShipStatType.impact_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.EShipStatModifier.increase
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