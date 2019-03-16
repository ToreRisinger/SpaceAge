import { ShipModules } from "./ShipModules"

export module DataObjects {

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
    export enum ShipProperyTypeEnum {
        thrust,
        max_speed,
        weight,
        hull,
        armor,
        shield,
        vision_range,
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

    export enum ShipPropertyModifierEnum {
        increase,
        decrease,
        percent_increase,
        percent_decrease,
    }
    
    export interface IModulePropery {
        property : ShipProperyTypeEnum,
        modifier : ShipPropertyModifierEnum,
        value : number;
    }

    export interface IModule extends IIdentifiableObject {
        quality : number,      // 1-5
        module_type : ShipModules.SHIP_MODULE_TYPE_ENUM,
        properties : Array<IModulePropery>
    }

    export interface ModulePropertyGenerationConfig {
        property : DataObjects.ShipProperyTypeEnum,
        modifier : DataObjects.ShipPropertyModifierEnum,
        min : number,
        max : number
    }

    export interface IModuleTypeProperties {
        base : Array<ModulePropertyGenerationConfig>,
        possibleExtraProps : Array<ModulePropertyGenerationConfig>
    }

    export interface IShipModuleInfo {
        sprite : ISprite,
        animation : IAnimation | undefined,
        properties : IModuleTypeProperties
    }

    /**
     * SHIP
     */
    export interface IShip extends IGameObject {
        speed: number
        maxSpeed: number,
        isMoving : boolean,
        destinationX : number,
        destinationY : number,
        acceleration : number,
        velVec : Array<number>
        modules : Array<{ module: IModule, x : number, y : number }>
        properties : {
            [ShipProperyTypeEnum.thrust] : number,                            // N
            [ShipProperyTypeEnum.max_speed] : number,                         // m/s
            [ShipProperyTypeEnum.weight] : number,                            // kg
            [ShipProperyTypeEnum.hull] : number,
            [ShipProperyTypeEnum.armor] : number,
            [ShipProperyTypeEnum.shield] : number,
            [ShipProperyTypeEnum.vision_range] : number,                      // m
            [ShipProperyTypeEnum.gravity_detection_range] : number,           // m
            [ShipProperyTypeEnum.shield_generation] : number,
            [ShipProperyTypeEnum.armor_repair] : number,
            [ShipProperyTypeEnum.armor_impact_resistance] : number,
            [ShipProperyTypeEnum.armor_heat_resistance] : number,
            [ShipProperyTypeEnum.armor_explosion_resistance] : number,
            [ShipProperyTypeEnum.shield_impact_resistance] : number,
            [ShipProperyTypeEnum.shield_heat_resistance] : number,
            [ShipProperyTypeEnum.shield_explosion_resistance] : number,
            [ShipProperyTypeEnum.targeting_systems] : number,
            [ShipProperyTypeEnum.avoidance_systems] : number,
            [ShipProperyTypeEnum.energy_grid] : number,
            [ShipProperyTypeEnum.cargo_hold] : number,                        // m2
            [ShipProperyTypeEnum.acceleration] : number                       // m/t2
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