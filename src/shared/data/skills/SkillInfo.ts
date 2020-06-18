import { StatInfo } from "../stats/StatInfo"
import { ISkillStatModificationDef } from "./ISkillStatModificationDef";
import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";

export module SkillInfo {

    export interface ISkillInfo {
        name: string
        maxLevel: number,
        description: string,
        startLearningTime: number,
        learningTimeIncrease: number,
        stats: ISkillStatModificationDef
    }

    const skillTypeToSkillInfoMap : { [key: number]: ISkillInfo } = {
        [EStatType.mining_laser_range] : {
            name: "Astroid Detection",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.mining_laser_range) + ".",
            maxLevel: 5,
            startLearningTime: 14321321,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.decrease_percentage,
                stat: EStatType.mining_laser_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.mining_laser_strength] : {
            name: "Miner",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.mining_laser_strength) + ".",
            maxLevel: 5,
            startLearningTime: 61342160,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.mining_laser_strength,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.normal_dps] : {
            name: "Weaponry",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.normal_dps) + ".",
            maxLevel: 5,
            startLearningTime: 12345,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.normal_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.heat_dps] : {
            name: "Ammunition Design",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.heat_dps) + ".",
            maxLevel: 5,
            startLearningTime: 9876,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.heat_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.impact_dps] : {
            name: "Ammunition Expert",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.impact_dps) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.impact_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.explosive_dps] : {
            name: "Demolition",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.explosive_dps) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.explosive_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.weapon_range] : {
            name: "Target Detection",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.weapon_range) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.weapon_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.radar_signature_reduction] : {
            name: "Radar Distruption",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.radar_signature_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.radar_signature_reduction,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.dodge] : {
            name: "Evade",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.dodge) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.dodge,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.cargo_hold] : {
            name: "Horder",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.cargo_hold) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.cargo_hold,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.target_dodge_reduction] : {
            name: "Scout",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.target_dodge_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.target_dodge_reduction,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.armor_explosion_resistance] : {
            name: "Armor Plating",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.armor_explosion_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.armor_explosion_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.armor_heat_resistance] : {
            name: "Armor Bending",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.armor_heat_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.armor_heat_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.armor_impact_resistance] : {
            name: "Armor hardening",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.armor_impact_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.armor_impact_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.shield_generation] : {
            name: "Shield generator calibrator",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.shield_generation) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.shield_generation,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.shield] : {
            name: "Shield generator mechanic",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.shield) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.shield,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.armor] : {
            name: "Armor technician",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.armor) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.armor,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.hull] : {
            name: "Preserver",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.hull) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.hull,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.power] : {
            name: "Electrician",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.power) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.power,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.thrust] : {
            name: "Engine Calibrator",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.thrust) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.thrust,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.max_speed] : {
            name: "Navigator",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.max_speed) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.max_speed,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.acceleration] : {
            name: "Engine Mechanic",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.acceleration) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.acceleration,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.radar_range] : {
            name: "Surveyor",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.radar_range) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_additive,
                stat: EStatType.radar_range,
                values: [1000, 2000, 3000, 4000, 5000]
            }
        },
        [EStatType.max_nr_of_modules] : {
            name: "Commander",
            description: "Increases the maximum number of modules your ship can contain.",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.max_nr_of_modules,
                values: [5, 10, 50, 100, 200]
            }
        }
    }

    export function getSkillInfo(statType : EStatType) : ISkillInfo {
        return skillTypeToSkillInfoMap[statType];
    }
}