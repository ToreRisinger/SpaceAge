import { ISprite } from "../ISprite";
import { IModuleTypeProperties } from "./IModuleTypeProperties";
import { EModuleItemType } from "../item/EModuleItemType";
import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";
import { EItemType } from "../item/EItemType";
import { SPRITES } from "../../util/SPRITES";

export module ShipModuleInfo {

    export interface IShipModuleInfo {
        sprite : ISprite,
        stats : IModuleTypeProperties
    }

    const moduleTypeToProperyMap : { [key: number]: IShipModuleInfo } = {
        /* MAIN MODULES */
        [EModuleItemType.MAIN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.armor,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.thrust,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_range,
                        max : [20000, 3000, 4000, 5000, 6000],
                        min : [10000, 2000, 3000, 4000, 5000],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.cargo_hold_size,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.power,
                        max : [10, 15, 20, 25, 30],
                        min : [5, 10, 15, 20, 25],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* MODULES */
        [EModuleItemType.RADAR_SIGNATURE_REDUCTION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_signature_reduction,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.CARGO_HOLD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.cargo_hold_size,
                        max : [100, 150, 200, 250, 300],
                        min : [50, 100, 150, 200, 250],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.cargo_containers,
                        max : [1, 1, 1, 1, 1],
                        min : [1, 1, 1, 1, 1],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.THRUST_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.thrust,
                        max : [21000, 32000, 43000, 54000, 65000],
                        min : [20000, 31000, 42000, 53000, 64000],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.POWER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.power,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.RADAR_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.WEAPON_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.MINING_RANGE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.SHIELD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield_generation,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.SHIELD_GENERATION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.shield_generation,
                        max : [5, 10, 15, 20, 25],
                        min : [10, 15, 20, 25, 30],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.ARMOR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.armor,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.SUPPORT_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.TARGET_DODGE_REDUCTION_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.target_dodge_reduction,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    }
                ],
                possibleExtraStats : []
            }
        },
        /* WEAPON MODULES */
        [EModuleItemType.MINING_LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_yield,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mining_laser_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        },
        [EModuleItemType.TURRET_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: EStatType.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                    {
                        stat: EStatType.weapon_damage,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : EStatModifier.increase_additive
                    },
                ],
                possibleExtraStats : []
            }
        }
    }

    export function getModuleInfo(moduleType : EItemType) : IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}