export module Stats {

    let RED = "rgb(255, 84, 84)";
    let GREEN = "rgb(108, 255, 89)";

    export enum EStatModifier {
        increase_additive,
        decrease_additive,
        increase_percentage,
        decrease_percentage,
        neutral
    }

    export enum EStatType {
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
        armor_impact_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
        armor_heat_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
        armor_explosion_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
        target_dodge_reduction, // calculating %: log((stat/(radar_range/<some_low_value_to_reduce_radar_range_impact>)+1)), gives value between 0->1 which is the %
        cargo_hold,
        dodge, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
        radar_signature_reduction, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
        weapon_range,
        explosive_dps,
        impact_dps,
        heat_dps,
        normal_dps,
        mining_laser_strength,
        mining_laser_range,
        max_nr_of_modules
    }

    //TODO move to stat module
    export enum EDamageType {
        NORMAL_DAMAGE,
        EXPLOSIVE_DAMAGE,
        HEAT_DAMAGE,
        IMPACT_DAMAGE
    }
    
    //TODO move to stat module
    export function statTypeToString(value : EStatType) : string {
        switch(value) {
            case EStatType.acceleration : 
                return "Acceleration";
            case EStatType.max_speed :
                return "Max speed";
            case EStatType.thrust :
                return "Thrust";
            case EStatType.power :
                return "Power";
            case EStatType.mass :
                return "Mass";
            case EStatType.hull :
                return "Hull";
            case EStatType.armor :
                return "Armor";
            case EStatType.shield :
                return "Shield";
            case EStatType.radar_range :
                return "Radar range";
            case EStatType.shield_generation :
                return "Shield generation";
            case EStatType.armor_impact_resistance :
                return "Armor impact resistance";
            case EStatType.armor_heat_resistance :
                return "Armor heat resistance";
            case EStatType.armor_explosion_resistance :
                return "Armor explosion resistance";
            case EStatType.target_dodge_reduction :
                return "Target dodge reduction";
            case EStatType.cargo_hold :
                return "Cargo hold";
            case EStatType.dodge :
                return "Dodge chance";
            case EStatType.radar_signature_reduction :
                return "Radar signature reduction";
            case EStatType.weapon_range :
                return "Weapon range";
            case EStatType.explosive_dps :
                return "Explosive damage";
            case EStatType.impact_dps :
                return "Impact damage";
            case EStatType.heat_dps :
                return "Heat damage";
            case EStatType.normal_dps :
                return "Normal damage";
            case EStatType.mining_laser_strength :
                return "Mining laser strength";
            case EStatType.mining_laser_range :
                return "Mining laser range";
            case EStatType.max_nr_of_modules : 
                return "Maximum number of modules";
            default :
                return "";
        }
    }

    export function statTypeUnitToString(value : EStatType) : string {
        switch(value) {
            case EStatType.acceleration : 
                return ' m/s<sup>2</sup> ';
            case EStatType.max_speed :
                return " m/s ";
            case EStatType.thrust :
                return " N ";
            case EStatType.mass :
                return " kg ";
            case EStatType.hull :
                return " ";
            case EStatType.armor :
                return " ";
            case EStatType.shield :
                return " ";
            case EStatType.radar_range :
                return " m ";
            case EStatType.shield_generation :
                return " points per second";
            case EStatType.armor_impact_resistance :
                return " ";
            case EStatType.armor_heat_resistance :
                return " ";
            case EStatType.armor_explosion_resistance :
                return " ";
            case EStatType.target_dodge_reduction :
                return " ";
            case EStatType.cargo_hold :
                return ' m<sup>2</sup> ';
            case EStatType.dodge :
                return " ";
            case EStatType.radar_signature_reduction :
                return " ";
            case EStatType.weapon_range :
                return " m ";
            case EStatType.explosive_dps :
                return " damage per second ";
            case EStatType.impact_dps :
                return " damage per second ";
            case EStatType.heat_dps :
                return " damage per second ";
            case EStatType.normal_dps :
                return " damage per second ";
            case EStatType.mining_laser_strength :
                return " ";
            case EStatType.mining_laser_range :
                return " m ";
            case EStatType.max_nr_of_modules : 
                return " ";
            default :
                return " ";
        }
    }

    export function statModifierToString(value : EStatModifier) : string {
        switch(value) {
            case EStatModifier.decrease_additive :
                return "-";
            case EStatModifier.decrease_percentage:
                return "-";
            case EStatModifier.increase_additive:
                return "+";
            case EStatModifier.increase_percentage:
                return "+";
            default :
                return "";
        }
    }

    export function statModifierColor(value : EStatModifier) : string {
        switch(value) {
            case EStatModifier.decrease_additive :
                return RED;
            case EStatModifier.decrease_percentage:
                return RED;
            case EStatModifier.increase_additive:
                return GREEN;
            case EStatModifier.increase_percentage:
                return GREEN;
            default :
                return GREEN;
        }
    }

    export function getAddedValue(baseStat: number, modifier: EStatModifier, value: number) : number {
        switch(modifier) {
            case EStatModifier.decrease_additive:
                return -value;
            case EStatModifier.decrease_percentage:
                return -(baseStat * value / 100);
            case EStatModifier.increase_additive:
                    return value;
            case EStatModifier.increase_percentage:
                return baseStat * value / 100;
            default:
                return 0;
        }
    }

    export function getRatingToPercentage(value: number, mass: number) : number {
        return Math.log10((value/(mass*0.1)) + 1);
    }
}