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
        weight,
        hull,
        armor,
        shield,
        radar_range,
        gravity_detection_range,
        shield_generation,
        armor_repair,
        armor_impact_resistance,
        armor_heat_resistance,
        armor_explosion_resistance,
        shield_impact_resistance,
        shield_heat_resistance,
        shield_explosion_resistance,
        targeting_systems,
        avoidance_systems,
        energy_grid,
        cargo_hold,
        acceleration,
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
        speed: number
        isMoving : boolean,
        destinationX : number,
        destinationY : number,
        acceleration : number,
        velVec : Array<number>
        modules : Array<{ module: IModule, x : number, y : number }>
        stats : {
            [ShipStatTypeEnum.thrust] : number,
            [ShipStatTypeEnum.max_speed] : number,
            [ShipStatTypeEnum.weight] : number,
            [ShipStatTypeEnum.hull] : number,
            [ShipStatTypeEnum.armor] : number,
            [ShipStatTypeEnum.shield] : number,
            [ShipStatTypeEnum.radar_range] : number,
            [ShipStatTypeEnum.gravity_detection_range] : number,
            [ShipStatTypeEnum.shield_generation] : number,
            [ShipStatTypeEnum.armor_repair] : number,
            [ShipStatTypeEnum.armor_impact_resistance] : number,
            [ShipStatTypeEnum.armor_heat_resistance] : number,
            [ShipStatTypeEnum.armor_explosion_resistance] : number,
            [ShipStatTypeEnum.shield_impact_resistance] : number,
            [ShipStatTypeEnum.shield_heat_resistance] : number,
            [ShipStatTypeEnum.shield_explosion_resistance] : number,
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