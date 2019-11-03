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
        thrust,
        max_speed,
        acceleration,
        avoidance_systems,
        mass,
        hull,
        armor,
        shield,
        gravity_radar_range,
        shield_generation,
        armor_impact_resistance,
        armor_heat_resistance,
        armor_explosion_resistance,
        targeting_systems,
        energy_grid,
        cargo_hold
    }

    export enum ShipStatModifierEnum {
        increase,
        decrease,
        percent_increase,
        percent_decrease,
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
        min : number,
        max : number
    }

    export interface IModuleTypeProperties {
        base : Array<ModuleStatGenerationConfig>,
        possibleExtraStats : Array<ModuleStatGenerationConfig>
    }

    export interface IShipModuleInfo {
        sprite : ISprite,
        animation : IAnimation | undefined,
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
            [ShipStatTypeEnum.thrust] : number,
            [ShipStatTypeEnum.max_speed] : number,
            [ShipStatTypeEnum.mass] : number,
            [ShipStatTypeEnum.hull] : number,
            [ShipStatTypeEnum.armor] : number,
            [ShipStatTypeEnum.shield] : number,
            [ShipStatTypeEnum.gravity_radar_range] : number,
            [ShipStatTypeEnum.shield_generation] : number,
            [ShipStatTypeEnum.armor_impact_resistance] : number,
            [ShipStatTypeEnum.armor_heat_resistance] : number,
            [ShipStatTypeEnum.armor_explosion_resistance] : number,
            [ShipStatTypeEnum.targeting_systems] : number,
            [ShipStatTypeEnum.avoidance_systems] : number,
            [ShipStatTypeEnum.energy_grid] : number,
            [ShipStatTypeEnum.cargo_hold] : number,
            [ShipStatTypeEnum.acceleration] : number
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