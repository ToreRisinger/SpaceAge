import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";


export module ShipModules {

    export enum SHIP_MODULE_TYPE_ENUM {
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
        RAIL_GUN_MODULE
    }

    const moduleTypeToProperyMap : { [key: number]: ObjectInterfaces.IShipModuleInfo } = {
        /* MAIN MODULES */
        [SHIP_MODULE_TYPE_ENUM.MAIN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.thrust,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.cargo_hold,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.power,
                        max : [10, 15, 20, 25, 30],
                        min : [5, 10, 15, 20, 25],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* MODULES */
        [SHIP_MODULE_TYPE_ENUM.CLOAK_SYSTEM_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.radar_signature_reduction,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.cargo_hold,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.thrust,
                        max : [11000, 12000, 13000, 14000, 15000],
                        min : [10000, 11000, 12000, 13000, 14000],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.POWER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.power,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.RADAR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.radar_range,
                        max : [2000, 3000, 4000, 5000, 6000],
                        min : [1000, 2000, 3000, 4000, 5000],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.SHIELD_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.shield_generation,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.shield,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.ARMOR_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : [200, 300, 400, 500, 600],
                        min : [100, 200, 300, 400, 500],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance,
                        max : [2, 3, 4, 5, 6],
                        min : [1, 2, 3, 4, 5],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.SUPPORT_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.TRACKING_SYSTEM_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.target_dodge_reduction,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* WEAPON MODULES */
        [SHIP_MODULE_TYPE_ENUM.LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.heat_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.MINING_LASER_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mining_laser_strength,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.MISSLE_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.explosive_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.TURRET_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.normal_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.RAIL_GUN_MODULE] : {
            sprite : SPRITES.SHIP_MODULE.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.hull,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.mass,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.impact_dps,
                        max : [20, 30, 40, 50, 60],
                        min : [10, 20, 30, 40, 50],
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                ],
                possibleExtraStats : []
            }
        }
    }

    export function getModuleInfo(moduleType : SHIP_MODULE_TYPE_ENUM) : ObjectInterfaces.IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}