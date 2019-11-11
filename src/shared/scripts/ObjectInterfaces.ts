import { Items } from "./Items";

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



    /*

    export interface IModule {
        quality : number,      // 1-5
        module_type : Items.EItemType,
        stats : Array<IModuleStat>
    }
    */

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
        socket: any,
        ship: IShip
    }
}