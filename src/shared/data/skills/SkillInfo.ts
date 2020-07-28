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
            name: "Mining Laser Range",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.mining_laser_range) + ".",
            maxLevel: 5,
            startLearningTime: 14321321,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.decrease_percentage,
                stat: EStatType.mining_laser_range,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.mining_laser_yield] : {
            name: "Mining Laser Strength",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.mining_laser_yield) + ".",
            maxLevel: 5,
            startLearningTime: 61342160,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.mining_laser_yield,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.weapon_damage] : {
            name: "Weapon Damage",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.weapon_damage) + ".",
            maxLevel: 5,
            startLearningTime: 12345,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.weapon_damage,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.weapon_range] : {
            name: "Weapon Range",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.weapon_range) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.weapon_range,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.radar_signature_reduction] : {
            name: "Radar Signature Reduction",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.radar_signature_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.radar_signature_reduction,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.dodge] : {
            name: "Dodge",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.dodge) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.dodge,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.cargo_hold_size] : {
            name: "Cargo Hold",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.cargo_hold_size) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.cargo_hold_size,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.target_dodge_reduction] : {
            name: "Target Dodge Reduction",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.target_dodge_reduction) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.target_dodge_reduction,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.shield_generation] : {
            name: "Shield Generation",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.shield_generation) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.shield_generation,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.shield] : {
            name: "Shield",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.shield) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.shield,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.armor] : {
            name: "Armor",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.armor) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.armor,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.hull] : {
            name: "Hull",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.hull) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.hull,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.power] : {
            name: "Power",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.power) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.power,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.thrust] : {
            name: "Thrust",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.thrust) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.thrust,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.max_speed] : {
            name: "Max Speed",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.max_speed) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.max_speed,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.acceleration] : {
            name: "Acceleration",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.acceleration) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_percentage,
                stat: EStatType.acceleration,
                values: [0, 0.5, 1, 1.5, 2, 2.5]
            }
        },
        [EStatType.radar_range] : {
            name: "Radar Range",
            description: "Increases ship " + StatInfo.statTypeToString(EStatType.radar_range) + ".",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.increase_additive,
                stat: EStatType.radar_range,
                values: [0, 1000, 2000, 3000, 4000, 5000]
            }
        },
        [EStatType.max_nr_of_modules] : {
            name: "Ship Size",
            description: "Increases the maximum number of modules your ship can contain.",
            maxLevel: 5,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.max_nr_of_modules,
                values: [0, 5, 10, 50, 100, 200]
            }
        },
        [EStatType.main_module_quality] : {
            name: "Main Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.main_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.thrust_module_quality] : {
            name: "Thrust Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.thrust_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.power_module_quality] : {
            name: "Power Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.power_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.cargo_hold_module_quality] : {
            name: "Cargo Hold Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.cargo_hold_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.armor_module_quality] : {
            name: "Armor Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.armor_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.shield_module_quality] : {
            name: "Shield Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.shield_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.shield_generation_module_quality] : {
            name: "Shield Generation Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.shield_generation_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.radar_range_module_quality] : {
            name: "Radar Range Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.radar_range_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.weapon_range_module_quality] : {
            name: "Weapon Range Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.weapon_range_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.mining_laser_module_quality] : {
            name: "Mining Laser Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.mining_laser_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.turret_module_quality] : {
            name: "Turret Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.turret_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.target_dodge_reduction_module_quality] : {
            name: "Target Dodge Reduction Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.target_dodge_reduction_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.radar_signature_reduction_module_quality] : {
            name: "Radar Signature Reduction Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.radar_signature_reduction_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.refinary_module_quality] : {
            name: "Refinary Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.refinary_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.factory_module_quality] : {
            name: "Factory Module",
            description: "Allows using higher quality modules of given type.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.factory_module_quality,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.refining_skill] : {
            name: "Refining",
            description: "Increases the skill in refining, making it possible to refine rarer ores.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.refining_skill,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        [EStatType.manufactoring_skill] : {
            name: "Manufactoring",
            description: "Increases the skill in manufactoring, making it possible to manufactor items of higher quality.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.manufactoring_skill,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        }

        ,
        [EStatType.hull_repair_cost] : {
            name: "Hull Repair Efficiency",
            description: "Decreases the cost of hull repair.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.hull_repair_cost,
                values: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            }
        },
        [EStatType.hull_repair_speed] : {
            name: "Hull repair speed",
            description: "Increases the speed at which hull is repaired.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.hull_repair_speed,
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            }
        },
        [EStatType.armor_repair_cost] : {
            name: "Armor Repair Efficiency",
            description: "Decreases the cost of armor repair.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.armor_repair_cost,
                values: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            }
        },
        [EStatType.armor_repair_speed] : {
            name: "Armor repair speed",
            description: "Increases the speed at which armor is repaired.",
            maxLevel: 10,
            startLearningTime: 60,
            learningTimeIncrease: 2.0,
            stats: {
                modifier: EStatModifier.neutral,
                stat: EStatType.armor_repair_speed,
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            }
        }

    }

    export function getSkillInfo(statType : EStatType) : ISkillInfo {
        return skillTypeToSkillInfoMap[statType];
    }
}