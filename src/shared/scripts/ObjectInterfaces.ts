import { ShipModules } from "./ShipModules"

export module ObjectInterfaces {

    export interface IIdentifiableObject {
        id : number,
    }

    export interface IGameObject extends IIdentifiableObject {
        x : number,
        y : number
    }

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
    export enum ShipStatTypeEnum {
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

    export enum ShipStatModifierEnum {
        increase,
        decrease
    }
    
    export interface IModuleStat {
        property : ShipStatTypeEnum,
        modifier : ShipStatModifierEnum,
        value : number;
    }

    export interface IModule extends IIdentifiableObject {
        quality : number,      // 1-5
        module_type : ShipModules.SHIP_MODULE_TYPE_ENUM,
        stats : Array<IModuleStat>
    }

    export interface ModuleStatGenerationConfig {
        stat : ObjectInterfaces.ShipStatTypeEnum,
        modifier : ObjectInterfaces.ShipStatModifierEnum,
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

    /**
     * SHIP
     */
    export interface IShip extends IGameObject {
        meters_per_second: number
        isMoving : boolean,
        hasDestination : boolean,
        destVec : Array<number>
        velVec : Array<number>
        modules : Array<{ module: IModule, x : number, y : number }>
        stats : {
            [ShipStatTypeEnum.acceleration] : number,
            [ShipStatTypeEnum.max_speed] : number,
            [ShipStatTypeEnum.thrust] : number,
            [ShipStatTypeEnum.mass] : number,
            [ShipStatTypeEnum.power] : number,
            [ShipStatTypeEnum.hull] : number,
            [ShipStatTypeEnum.armor] : number,
            [ShipStatTypeEnum.shield] : number,
            [ShipStatTypeEnum.radar_range] : number,
            [ShipStatTypeEnum.shield_generation] : number,
            [ShipStatTypeEnum.armor_impact_resistance] : number,
            [ShipStatTypeEnum.armor_heat_resistance] : number,
            [ShipStatTypeEnum.armor_explosion_resistance] : number,
            [ShipStatTypeEnum.target_dodge_reduction] : number,
            [ShipStatTypeEnum.radar_signature_reduction] : number,
            [ShipStatTypeEnum.cargo_hold] : number,
            [ShipStatTypeEnum.dodge] : number,
            [ShipStatTypeEnum.radar_signature_reduction] : number,
            [ShipStatTypeEnum.weapon_range] : number,
            [ShipStatTypeEnum.explosive_dps] : number,
            [ShipStatTypeEnum.impact_dps] : number,
            [ShipStatTypeEnum.heat_dps] : number,
            [ShipStatTypeEnum.normal_dps] : number,
            [ShipStatTypeEnum.mining_laser_strength] : number,
            [ShipStatTypeEnum.mining_laser_range] : number
        }
        properties : {
            currentArmor: number,
            currentHull : number,
            currentShield : number
        }
    }
    
    /**
     * PLAYER
     */
    export interface IPlayer {
        socket: any,
        ship: IShip
    }
}