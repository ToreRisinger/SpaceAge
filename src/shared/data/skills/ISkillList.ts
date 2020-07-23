import { ISkill } from "./ISkill";
import { EStatType } from "../stats/EStatType";

export interface ISkillList {
    [EStatType.acceleration] : ISkill,
    [EStatType.max_speed] : ISkill,
    [EStatType.thrust] : ISkill,
    [EStatType.power] : ISkill,
    [EStatType.hull] : ISkill,
    [EStatType.armor] : ISkill,
    [EStatType.shield] : ISkill,
    [EStatType.radar_range] : ISkill,
    [EStatType.weapon_range] : ISkill,
    [EStatType.mining_laser_range] : ISkill,
    [EStatType.shield_generation] : ISkill,
    [EStatType.target_dodge_reduction] : ISkill,
    [EStatType.radar_signature_reduction] : ISkill,
    [EStatType.cargo_hold_size] : ISkill,
    [EStatType.cargo_containers] : ISkill,
    [EStatType.dodge] : ISkill,
    [EStatType.weapon_damage] : ISkill,
    [EStatType.mining_laser_yield] : ISkill,

    [EStatType.max_nr_of_modules] : ISkill,
    [EStatType.main_module_quality] : ISkill,
    [EStatType.thrust_module_quality] : ISkill,
    [EStatType.power_module_quality] : ISkill,
    [EStatType.cargo_hold_module_quality] : ISkill,
    [EStatType.armor_module_quality] : ISkill,
    [EStatType.shield_module_quality] : ISkill,
    [EStatType.shield_generation_module_quality] : ISkill,
    [EStatType.radar_range_module_quality] : ISkill,
    [EStatType.weapon_range_module_quality] : ISkill,
    [EStatType.mining_laser_module_quality] : ISkill,
    [EStatType.turret_module_quality] : ISkill,
    [EStatType.target_dodge_reduction_quality] : ISkill,
    [EStatType.radar_signature_reduction_module_quality] : ISkill,
}