export module DataObjects {

    export interface Identifiable_Object_Config {
        id : number,
    }

    export interface Game_Object_Config extends Identifiable_Object_Config {
        x : number,
        y : number
    }

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
            thrust : number,                            // N
            max_speed : number,                         // m/s
            weight : number,                            // kg
            hull : number,
            armor : number,
            shield : number,
            vision_range : number,                      // m
            gravity_detection_range : number,           // m
            shield_generation : number,
            armor_repair : number,
            armor_impact_resistance : number,
            armor_heat_resistance : number,
            armor_explosion_resistance : number,
            shield_impact_resistance : number,
            shield_heat_resistance : number,
            shield_explosion_resistance : number,
            targeting_systems : number,
            avoidance_systems : number,
            energy_grid : number,
            cargo_hold : number,                        // m2
            acceleration : number                       // m/t2
        }
    }

    export interface Module_Config extends Identifiable_Object_Config {
        quality : number,      // 1-5
        module_type : number
    }

    export interface Player {
        socket: any,
        ship: Ship_Config
    }
}