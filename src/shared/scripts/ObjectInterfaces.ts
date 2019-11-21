import { Items } from "./Items";
import { AsteroidData } from "./AsteroidData";

export module ObjectInterfaces {

    export interface ISprite {
        key: string,
        file: string,
        width: number,
        height: number
    }

    export interface IAnimation {
        key: string,
        frameRate: number,
        repeat: number, 
        frames: Array<number>
    }
  
    /**
     * MODULE
     */
    export enum EShipStatType {
        acceleration,
        max_speed,
        thrust,
        mass,
        power,
        hull,
        armor,
        shield, 
        radar_range,
        shield_generation,
        armor_impact_resistance,
        armor_heat_resistance,
        armor_explosion_resistance,
        target_dodge_reduction,
        cargo_hold,
        dodge,
        radar_signature_reduction,
        weapon_range,
        explosive_dps,
        impact_dps,
        heat_dps,
        normal_dps,
        mining_laser_strength,
        mining_laser_range
    }

    export enum EShipStatModifier {
        increase,
        decrease
    }

    export enum EDamageType {
        NORMAL_DAMAGE,
        EXPLOSIVE_DAMAGE,
        HEAT_DAMAGE,
        IMPACT_DAMAGE
    }

    export function shipStatTypeToString(value : EShipStatType) : string {
        switch(value) {
            case EShipStatType.acceleration : 
                return "Acceleration";
            case EShipStatType.max_speed :
                return "Max speed";
            case EShipStatType.thrust :
                return "Thrust";
            case EShipStatType.mass :
                return "Mass";
            case EShipStatType.hull :
                return "Hull";
            case EShipStatType.armor :
                return "Armor";
            case EShipStatType.shield :
                return "Shield";
            case EShipStatType.radar_range :
                return "Radar range";
            case EShipStatType.shield_generation :
                return "Shield generation";
            case EShipStatType.armor_impact_resistance :
                return "Armor impact resistance";
            case EShipStatType.armor_heat_resistance :
                return "Armor heat resistance";
            case EShipStatType.armor_explosion_resistance :
                return "Armor explosion resistance";
            case EShipStatType.target_dodge_reduction :
                return "Target dodge reduction";
            case EShipStatType.cargo_hold :
                return "Cargo hold";
            case EShipStatType.dodge :
                return "Dodge chance";
            case EShipStatType.radar_signature_reduction :
                return "Radar signature reduction";
            case EShipStatType.weapon_range :
                return "Weapon range";
            case EShipStatType.explosive_dps :
                return "Explosive damage";
            case EShipStatType.impact_dps :
                return "Impact damage";
            case EShipStatType.heat_dps :
                return "Heat damage";
            case EShipStatType.normal_dps :
                return "Normal damage";
            case EShipStatType.mining_laser_strength :
                return "Mining laser strength";
            case EShipStatType.mining_laser_range :
                return "Mining laser range";
            default :
                return "";
        }
    }

    export function shipStatTypeUnitToString(value : EShipStatType) : string {
        switch(value) {
            case EShipStatType.acceleration : 
                return "m/s<sup>2</sup>";
            case EShipStatType.max_speed :
                return "m/s";
            case EShipStatType.thrust :
                return "N";
            case EShipStatType.mass :
                return "kg";
            case EShipStatType.hull :
                return "";
            case EShipStatType.armor :
                return "";
            case EShipStatType.shield :
                return "";
            case EShipStatType.radar_range :
                return "m";
            case EShipStatType.shield_generation :
                return "points per second";
            case EShipStatType.armor_impact_resistance :
                return "%";
            case EShipStatType.armor_heat_resistance :
                return "%";
            case EShipStatType.armor_explosion_resistance :
                return "%";
            case EShipStatType.target_dodge_reduction :
                return "%";
            case EShipStatType.cargo_hold :
                return "m<sup>2</sup>";
            case EShipStatType.dodge :
                return "%";
            case EShipStatType.radar_signature_reduction :
                return "%";
            case EShipStatType.weapon_range :
                return "m";
            case EShipStatType.explosive_dps :
                return "damage per second";
            case EShipStatType.impact_dps :
                return "damage per second";
            case EShipStatType.heat_dps :
                return "damage per second";
            case EShipStatType.normal_dps :
                return "damage per second";
            case EShipStatType.mining_laser_strength :
                return "";
            case EShipStatType.mining_laser_range :
                return "m";
            default :
                return "";
        }
    }

    export function shipStatModifierToString(value : EShipStatModifier) : string {
        switch(value) {
            case EShipStatModifier.decrease :
                return "-";
            case EShipStatModifier.increase :
                return "+";
            default :
                return "";
        }
    }

    /*
        GAME OBJECTS
    */

    export interface IIdentifiableObject {
        id : number,
    }

    export interface IGameObject extends IIdentifiableObject {
        x : number,
        y : number
    }

    /**
     * SHIP
     */
    export interface IShip extends IGameObject {
        meters_per_second: number
        isMoving : boolean,
        hasDestination : boolean,
        isAttacking : boolean,
        isMining : boolean,
        hasWeapon : boolean,
        hasMiningLaser : boolean,
        targetId : number,
        destVec : Array<number>
        velVec : Array<number>
        cargo : ICargo
        modules : Array<{ moduleItem: Items.IItem, x : number, y : number }>
        stats : {
            [EShipStatType.acceleration] : number,
            [EShipStatType.max_speed] : number,
            [EShipStatType.thrust] : number,
            [EShipStatType.mass] : number,
            [EShipStatType.power] : number,
            [EShipStatType.hull] : number,
            [EShipStatType.armor] : number,
            [EShipStatType.shield] : number,
            [EShipStatType.radar_range] : number,
            [EShipStatType.shield_generation] : number,
            [EShipStatType.armor_impact_resistance] : number,
            [EShipStatType.armor_heat_resistance] : number,
            [EShipStatType.armor_explosion_resistance] : number,
            [EShipStatType.target_dodge_reduction] : number,
            [EShipStatType.radar_signature_reduction] : number,
            [EShipStatType.cargo_hold] : number,
            [EShipStatType.dodge] : number,
            [EShipStatType.radar_signature_reduction] : number,
            [EShipStatType.weapon_range] : number,
            [EShipStatType.explosive_dps] : number,
            [EShipStatType.impact_dps] : number,
            [EShipStatType.heat_dps] : number,
            [EShipStatType.normal_dps] : number,
            [EShipStatType.mining_laser_strength] : number,
            [EShipStatType.mining_laser_range] : number
        }
        properties : {
            currentArmor: number,
            currentHull : number,
            currentShield : number
        }
    }

    export interface ICargo {
        items : Array<Items.IItem>
    }
    
    /**
     * PLAYER
     */
    export interface IPlayer {
        playerId : number,
        socket: any,
        ship: IShip
    }
}