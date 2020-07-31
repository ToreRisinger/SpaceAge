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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
        }
    }

    export function getModuleInfo(moduleType : EItemType) : IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}