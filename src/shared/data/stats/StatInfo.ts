import { EStatType } from "./EStatType";
import { EStatModifier } from "./EStatModifier";
import { Colors } from "../../colors/Colors";

export module StatInfo {
    
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
            case EStatType.weapon_damage :
                return "Weapon damage";
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
            case EStatType.mining_laser_strength :
                return "Mining laser strength";
            case EStatType.mining_laser_range :
                return "Mining laser range";
            case EStatType.max_nr_of_modules : 
                return "Maximum number of modules";
            case EStatType.main_module_quality : 
                return "Maximum quality level";
            case EStatType.thrust_module_quality : 
                return "Maximum quality level";
            case EStatType.cargo_hold_module_quality : 
                return "Maximum quality level";
            case EStatType.power_module_quality : 
                return "Maximum quality level";
            case EStatType.armor_module_quality : 
                return "Maximum quality level";
            case EStatType.shield_module_quality : 
                return "Maximum quality level";
            case EStatType.shield_generation_module_quality : 
                return "Maximum quality level";
            case EStatType.radar_range_module_quality : 
                return "Maximum quality level";
            case EStatType.weapon_range_module_quality : 
                return "Maximum quality level";
            case EStatType.mining_laser_module_quality : 
                return "Maximum quality level";
            case EStatType.turret_module_quality : 
                return "Maximum quality level";
            case EStatType.target_dodge_reduction_quality : 
                return "Maximum quality level";
            case EStatType.radar_signature_reduction_module_quality : 
                return "Maximum quality level";
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
            case EStatType.weapon_damage :
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
                return Colors.RGB.RED;
            case EStatModifier.decrease_percentage:
                return Colors.RGB.RED;
            case EStatModifier.increase_additive:
                return Colors.RGB.GREEN;
            case EStatModifier.increase_percentage:
                return Colors.RGB.GREEN;
            default :
                return Colors.RGB.GREEN;
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
        return Math.log10((value/(mass*10)) + 1);
    }
}