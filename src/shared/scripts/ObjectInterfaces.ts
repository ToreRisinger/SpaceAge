import { Items } from "./Items";
import { Stats } from "../stats/Stats";

export module ObjectInterfaces {

    export interface IIdentifiableObject {
        id : number,
    }

    export interface IGameObject extends IIdentifiableObject {
        x : number,
        y : number
    }

    export interface IShipModuleInstance {
        moduleItem: Items.IItem, 
        x : number, 
        y : number
    }

    export interface IShip extends IGameObject {
        meters_per_second: number
        isMoving : boolean,
        hasDestination : boolean,
        isAttacking : boolean,
        isMining : boolean,
        hasWeapon : boolean,
        hasMiningLaser : boolean,
        isWarping : boolean,
        warpDestination : Array<number>,
        warpSource : Array<number>,
        targetId : number,
        destVec : Array<number>
        velVec : Array<number>
        modules : Array<IShipModuleInstance>
        stats : {
            [Stats.EStatType.acceleration] : number,
            [Stats.EStatType.max_speed] : number,
            [Stats.EStatType.thrust] : number,
            [Stats.EStatType.mass] : number,
            [Stats.EStatType.power] : number,
            [Stats.EStatType.hull] : number,
            [Stats.EStatType.armor] : number,
            [Stats.EStatType.shield] : number,
            [Stats.EStatType.radar_range] : number,
            [Stats.EStatType.shield_generation] : number,
            [Stats.EStatType.armor_impact_resistance] : number,
            [Stats.EStatType.armor_heat_resistance] : number,
            [Stats.EStatType.armor_explosion_resistance] : number,
            [Stats.EStatType.target_dodge_reduction] : number,
            [Stats.EStatType.radar_signature_reduction] : number,
            [Stats.EStatType.cargo_hold] : number,
            [Stats.EStatType.dodge] : number,
            [Stats.EStatType.radar_signature_reduction] : number,
            [Stats.EStatType.weapon_range] : number,
            [Stats.EStatType.explosive_dps] : number,
            [Stats.EStatType.impact_dps] : number,
            [Stats.EStatType.heat_dps] : number,
            [Stats.EStatType.normal_dps] : number,
            [Stats.EStatType.mining_laser_strength] : number,
            [Stats.EStatType.mining_laser_range] : number
        }
        properties : {
            currentArmor: number,
            currentHull : number,
            currentShield : number
        }
    }
}