import { SPRITES } from "./SPRITES"
import { SHIP_MODULE_TYPE_ENUM } from "../../../shared/scripts/SHIP_MODULE_TYPE_ENUM";

export const SHIP_MODULE_TYPES = {

    //Main modules
    [SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I] : {
        sprite : SPRITES.MAIN_MODULE_I.key,
        animation : SPRITES.MAIN_MODULE_I.anim,
    },

    //Modules
    [SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE_I] : {
        sprite : SPRITES.CARGO_HOLD_MODULE_I.key,
        animation : SPRITES.CARGO_HOLD_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.SHIP_PLATING_MODULE_I] : {
        sprite : SPRITES.SHIP_PLATING_MODULE_I.key,
        animation : SPRITES.SHIP_PLATING_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.REPAIR_FACILITY_MODULE_I] : {
        sprite : SPRITES.REPAIR_FACILITY_MODULE_I.key,
        animation : SPRITES.REPAIR_FACILITY_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.SHIELD_GENERATOR_MODULE_I] : {
        sprite : SPRITES.SHIELD_GENERATOR_MODULE_I.key,
        animation : SPRITES.SHIELD_GENERATOR_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.TARGETING_SYSTEM_MODULE_I] : {
        sprite : SPRITES.TARGETING_SYSTEM_MODULE_I.key,
        animation : SPRITES.TARGETING_SYSTEM_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.AVOIDANCE_SYSTEM_MODULE_I] : {
        sprite : SPRITES.AVOIDANCE_SYSTEM_MODULE_I.key,
        animation : SPRITES.AVOIDANCE_SYSTEM_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.POWER_GENERATOR_MODULE_I] : {
        sprite : SPRITES.POWER_GENERATOR_MODULE_I.key,
        animation : SPRITES.POWER_GENERATOR_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.RADAR_MODULE_I] : {
        sprite : SPRITES.RADAR_MODULE_I.key,
        animation : SPRITES.RADAR_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE_I] : {
        sprite : SPRITES.ENGINE_MODULE_I.key,
        animation : SPRITES.ENGINE_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.SUPPORT_MODULE_I] : {
        sprite : SPRITES.SUPPORT_MODULE_I.key,
        animation : SPRITES.SUPPORT_MODULE_I.anim,
    },

    //Weapon modules
    [SHIP_MODULE_TYPE_ENUM.LASER_MODULE_I] : {
        sprite : SPRITES.LASER_MODULE_I.key,
        animation : SPRITES.LASER_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.MINING_LASER_MODULE_I] : {
        sprite : SPRITES.MINING_LASER_MODULE_I.key,
        animation : SPRITES.MINING_LASER_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.MISSLE_MODULE_I] : {
        sprite : SPRITES.MISSLE_MODULE_I.key,
        animation : SPRITES.MISSLE_MODULE_I.anim,
    },
    [SHIP_MODULE_TYPE_ENUM.TURRET_MODULE_I] : {
        sprite : SPRITES.TURRET_MODULE_I.key,
        animation : SPRITES.TURRET_MODULE_I.anim,
    }
}


