import { ISkill } from "./ISkill";
import { EStatType } from "../stats/EStatType";

export interface ISkillList {
    [EStatType.max_nr_of_modules] : ISkill,
    [EStatType.acceleration] : ISkill,
    [EStatType.max_speed] : ISkill,
    [EStatType.thrust] : ISkill,
    [EStatType.power] : ISkill,
    [EStatType.hull] : ISkill,
    [EStatType.armor] : ISkill,
    [EStatType.shield] : ISkill,
    [EStatType.radar_range] : ISkill,
    [EStatType.shield_generation] : ISkill,
    [EStatType.armor_impact_resistance] : ISkill,
    [EStatType.armor_heat_resistance] : ISkill,
    [EStatType.armor_explosion_resistance] : ISkill,
    [EStatType.target_dodge_reduction] : ISkill,
    [EStatType.radar_signature_reduction] : ISkill,
    [EStatType.cargo_hold] : ISkill,
    [EStatType.dodge] : ISkill,
    [EStatType.radar_signature_reduction] : ISkill,
    [EStatType.weapon_range] : ISkill,
    [EStatType.explosive_dps] : ISkill,
    [EStatType.impact_dps] : ISkill,
    [EStatType.heat_dps] : ISkill,
    [EStatType.normal_dps] : ISkill,
    [EStatType.mining_laser_strength] : ISkill,
    [EStatType.mining_laser_range] : ISkill
}