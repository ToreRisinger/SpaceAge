
export module DataObjects {

    export interface Identifiable_Object_Config {
        id : number,
    }

    export interface Game_Object_Config extends Identifiable_Object_Config {
        x : number,
        y : number
    }
  
    /**
     * MODULE
     */
    export enum Ship_Property_Type_Enum {
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

    export enum Ship_Propery_Modifier_Enum {
        increase,
        decrease,
        percent_increase,
        percent_decrease,
    }
    
    export interface Ship_Property_Config {
        property : Ship_Property_Type_Enum,
        modifier : Ship_Propery_Modifier_Enum,
        value : number;
    }

    export interface Module_Config extends Identifiable_Object_Config {
        quality : number,      // 1-5
        module_type : number,
        properties : Array<Ship_Property_Config>
    }

    /**
     * SHIP
     */
    export interface Ship_Config extends Game_Object_Config {
        speed: number
        maxSpeed: number,
        isMoving : boolean,
        destinationX : number,
        destinationY : number,
        acceleration : number,
        velVec : Array<number>
        modules : Array<Array<Module_Config>>
        properties : {
            [Ship_Property_Type_Enum.thrust] : number,                            // N
            [Ship_Property_Type_Enum.max_speed] : number,                         // m/s
            [Ship_Property_Type_Enum.weight] : number,                            // kg
            [Ship_Property_Type_Enum.hull] : number,
            [Ship_Property_Type_Enum.armor] : number,
            [Ship_Property_Type_Enum.shield] : number,
            [Ship_Property_Type_Enum.vision_range] : number,                      // m
            [Ship_Property_Type_Enum.gravity_detection_range] : number,           // m
            [Ship_Property_Type_Enum.shield_generation] : number,
            [Ship_Property_Type_Enum.armor_repair] : number,
            [Ship_Property_Type_Enum.armor_impact_resistance] : number,
            [Ship_Property_Type_Enum.armor_heat_resistance] : number,
            [Ship_Property_Type_Enum.armor_explosion_resistance] : number,
            [Ship_Property_Type_Enum.shield_impact_resistance] : number,
            [Ship_Property_Type_Enum.shield_heat_resistance] : number,
            [Ship_Property_Type_Enum.shield_explosion_resistance] : number,
            [Ship_Property_Type_Enum.targeting_systems] : number,
            [Ship_Property_Type_Enum.avoidance_systems] : number,
            [Ship_Property_Type_Enum.energy_grid] : number,
            [Ship_Property_Type_Enum.cargo_hold] : number,                        // m2
            [Ship_Property_Type_Enum.acceleration] : number                       // m/t2
        }
    }
    
    /**
     * PLAYER
     */
    export interface Player {
        socket: any,
        ship: Ship_Config
    }
}