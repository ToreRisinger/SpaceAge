import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";


export module ShipModules {

    export enum SHIP_MODULE_TYPE_ENUM {
        //Main modules
        MAIN_MODULE_I,
    
        //Modules
        CARGO_HOLD_MODULE_I,
        SHIP_PLATING_MODULE_I,
        REPAIR_FACILITY_MODULE_I,
        SHIELD_GENERATOR_MODULE_I,
        TARGETING_SYSTEM_MODULE_I,
        AVOIDANCE_SYSTEM_MODULE_I,
        POWER_GENERATOR_MODULE_I,
        RADAR_MODULE_I,
        ENGINE_MODULE_I,
        SUPPORT_MODULE_I,
    
        //Weapon modules
        LASER_MODULE_I,
        MINING_LASER_MODULE_I,
        MISSLE_MODULE_I,
        TURRET_MODULE_I
    }

    const moduleTypeToProperyMap : { [key: number]: ObjectInterfaces.IShipModuleInfo } = {
        /* MAIN MODULES */
        [SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I] : {
            animation : SPRITES.MAIN_MODULE_I.animation,
            sprite : SPRITES.MAIN_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 20,
                        min : 10,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.thrust,
                        max : 20,
                        min : 10,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.vision_range,
                        max : 20,
                        min : 10,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.cargo_hold,
                        max : 20,
                        min : 10,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.energy_grid,
                        max : 5,
                        min : 3,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* MODULES */
        [SHIP_MODULE_TYPE_ENUM.AVOIDANCE_SYSTEM_MODULE_I] : {
            animation : SPRITES.AVOIDANCE_SYSTEM_MODULE_I.animation,
            sprite : SPRITES.AVOIDANCE_SYSTEM_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.avoidance_systems,
                        max : 4,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.vision_range,
                        max : 4,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 4,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ]
            }
        },
        [SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE_I] : {
            animation : SPRITES.CARGO_HOLD_MODULE_I.animation,
            sprite : SPRITES.CARGO_HOLD_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.cargo_hold,
                        max : 20,
                        min : 10,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ]
            }
        },
        [SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE_I] : {
            animation : SPRITES.ENGINE_MODULE_I.animation,
            sprite : SPRITES.ENGINE_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.thrust,
                        max : 4,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.POWER_GENERATOR_MODULE_I] : {
            animation : SPRITES.POWER_GENERATOR_MODULE_I.animation,
            sprite : SPRITES.POWER_GENERATOR_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.energy_grid,
                        max : 4,
                        min : 2,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.RADAR_MODULE_I] : {
            animation : SPRITES.RADAR_MODULE_I.animation,
            sprite : SPRITES.RADAR_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.vision_range,
                        max : 4,
                        min : 2,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.REPAIR_FACILITY_MODULE_I] : {
            animation : SPRITES.REPAIR_FACILITY_MODULE_I.animation,
            sprite : SPRITES.REPAIR_FACILITY_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor_repair,
                        max : 4,
                        min : 2,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.SHIELD_GENERATOR_MODULE_I] : {
            animation : SPRITES.SHIELD_GENERATOR_MODULE_I.animation,
            sprite : SPRITES.SHIELD_GENERATOR_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.shield_generation,
                        max : 4,
                        min : 2,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.SHIP_PLATING_MODULE_I] : {
            animation : SPRITES.SHIP_PLATING_MODULE_I.animation,
            sprite : SPRITES.SHIP_PLATING_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 4,
                        min : 2,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.SUPPORT_MODULE_I] : {
            animation : SPRITES.SUPPORT_MODULE_I.animation,
            sprite : SPRITES.SUPPORT_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.TARGETING_SYSTEM_MODULE_I] : {
            animation : SPRITES.TARGETING_SYSTEM_MODULE_I.animation,
            sprite : SPRITES.TARGETING_SYSTEM_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.targeting_systems,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },

        /* WEAPON MODULES */
        [SHIP_MODULE_TYPE_ENUM.LASER_MODULE_I] : {
            animation : SPRITES.LASER_MODULE_I.animation,
            sprite : SPRITES.LASER_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.MINING_LASER_MODULE_I] : {
            animation : SPRITES.MINING_LASER_MODULE_I.animation,
            sprite : SPRITES.MINING_LASER_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.MISSLE_MODULE_I] : {
            animation : SPRITES.MISSLE_MODULE_I.animation,
            sprite : SPRITES.MISSLE_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        },
        [SHIP_MODULE_TYPE_ENUM.TURRET_MODULE_I] : {
            animation : SPRITES.TURRET_MODULE_I.animation,
            sprite : SPRITES.TURRET_MODULE_I.sprite,
            stats : {
                base: [
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.armor,
                        max : 2,
                        min : 1,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    },
                    {
                        stat: ObjectInterfaces.ShipStatTypeEnum.weight,
                        max : 30,
                        min : 30,
                        modifier : ObjectInterfaces.ShipStatModifierEnum.increase
                    }
                ],
                possibleExtraStats : []
            }
        }
    }

    export function getModuleInfo(moduleType : SHIP_MODULE_TYPE_ENUM) : ObjectInterfaces.IShipModuleInfo {
        return moduleTypeToProperyMap[moduleType];
    }
}