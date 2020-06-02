import { Stats } from "../stats/Stats"

export module Skills {

    export enum EStatTypeSkillExtensions {
        MAX_NR_OF_MODULES = 24
    }

    export type ESkillStatType = EStatTypeSkillExtensions | Stats.EStatType;

    export interface IStatModificationDef {
        stat: ESkillStatType,
        modifier: Stats.EStatModifier,
    }

    export interface ISkillStatModificationDef extends IStatModificationDef {
        values: Array<number>
    }

    export interface ISkillInfo {
        name: string
        maxLevel: number,
        description: string,
        startLearningTime: number,
        learningTimeIncrease: number,
        stats: ISkillStatModificationDef
    }

    export interface ISkill {
        skillType: ESkillStatType,
        level: number
    }

    const skillTypeToSkillInfoMap : { [key: number]: ISkillInfo } = {
        [Stats.EStatType.mining_laser_range] : {
            name: "Astroid Detection",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.mining_laser_range) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.mining_laser_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.mining_laser_strength] : {
            name: "Miner",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.mining_laser_strength) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.mining_laser_strength,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.normal_dps] : {
            name: "Weaponry",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.normal_dps) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.normal_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.heat_dps] : {
            name: "Ammunition Design",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.heat_dps) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.heat_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.impact_dps] : {
            name: "Ammunition Expert",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.impact_dps) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.impact_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.explosive_dps] : {
            name: "Demolition",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.explosive_dps) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.explosive_dps,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.weapon_range] : {
            name: "Target Detection",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.weapon_range) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.weapon_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.radar_signature_reduction] : {
            name: "Radar Distruption",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.radar_signature_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.radar_signature_reduction,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.dodge] : {
            name: "Evade",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.dodge) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.dodge,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.cargo_hold] : {
            name: "Horder",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.cargo_hold) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.cargo_hold,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.target_dodge_reduction] : {
            name: "Scout",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.target_dodge_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.target_dodge_reduction,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.armor_explosion_resistance] : {
            name: "Armor Plating",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.armor_explosion_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.armor_explosion_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.armor_heat_resistance] : {
            name: "Armor Bending",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.armor_heat_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.armor_heat_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.armor_impact_resistance] : {
            name: "Armor hardening",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.armor_impact_resistance) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.armor_impact_resistance,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.shield_generation] : {
            name: "Shield generator calibrator",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.shield_generation) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.shield_generation,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.shield] : {
            name: "Shield generator mechanic",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.shield) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.shield,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.armor] : {
            name: "Armor technician",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.armor) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.armor,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.hull] : {
            name: "Preserver",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.hull) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.hull,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.power] : {
            name: "Electrician",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.power) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.power,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.thrust] : {
            name: "Engine Calibrator",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.thrust) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.thrust,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.max_speed] : {
            name: "Navigator",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.max_speed) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.max_speed,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.acceleration] : {
            name: "Engine Mechanic",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.acceleration) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_percentage,
                stat: Stats.EStatType.radar_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.radar_range] : {
            name: "Surveyor",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.radar_range) + ".",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.increase_additive,
                stat: Stats.EStatType.acceleration,
                values: [1000, 2000, 3000, 4000, 5000]
            }
        },
        [EStatTypeSkillExtensions.MAX_NR_OF_MODULES] : {
            name: "Commander",
            description: "Increases the maximum number of modules your ship can contain.",
            maxLevel: 5,
            startLearningTime: 1,
            learningTimeIncrease: 0.1,
            stats: {
                modifier: Stats.EStatModifier.neutral,
                stat: EStatTypeSkillExtensions.MAX_NR_OF_MODULES,
                values: [5, 10, 50, 100, 200]
            }
        }
    }

    export function getSkillInfo(statType : ESkillStatType) : ISkillInfo {
        return skillTypeToSkillInfoMap[statType];
    }
}