import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { Stats } from "../stats/Stats"

export module Skills {

    //TODO
    /*
        1. Make EShipStatType perhaps named something more generic to also include ship size, possibility to use certain modules etc.
        Its basically a generic stat for a character, not bound to ship

        2. ModuleStatGenerationConfig, move and rename to someting more generic to be able to increasy any Stat.
        Should exist a base interface with stat+modificatino, then subclasses can extend to add min/max or whtever they need
    */

    export enum ESKillStatType {
        MAX_NR_OF_MODULES = 24
    }

    export type ESkillStatType = ESKillStatType | Stats.EStatType;

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
        description: string
        stats: ISkillStatModificationDef
    }

    export interface ISkill {
        skillType: ESKillStatType,
        level: number
    }

    const skillTypeToSkillInfoMap : { [key: number]: ISkillInfo } = {
        /*
            acceleration = 24,
            max_speed,
            thrust,
            mass,
            power,
            hull,
            armor,
            shield, 
            radar_range,
            shield_generation,
            armor_impact_resistance,
            armor_heat_resistance,
            armor_explosion_resistance,
            target_dodge_reduction,
            cargo_hold,
            dodge,
            radar_signature_reduction,
            weapon_range,
            explosive_dps,
            impact_dps,
            heat_dps,
            normal_dps,
            mining_laser_strength,
            mining_laser_range,
            max_nr_of_modules
        */
        [Stats.EStatType.acceleration] : {
            name: "Surveyor",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.acceleration) + ".",
            maxLevel: 5,
            stats: {
                modifier: Stats.EStatModifier.increase_additive,
                stat: Stats.EStatType.radar_range,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [Stats.EStatType.acceleration] : {
            name: "Surveyor",
            description: "Increases ship " + Stats.statTypeToString(Stats.EStatType.radar_range) + ".",
            maxLevel: 5,
            stats: {
                modifier: Stats.EStatModifier.increase_additive,
                stat: Stats.EStatType.acceleration,
                values: [0.5, 1, 1.5, 2, 2.5]
            }
        },
        [ESKillStatType.MAX_NR_OF_MODULES] : {
            name: "Commander",
            description: "Increases the maximum number of modules your ship can contain.",
            maxLevel: 5,
            stats: {
                modifier: Stats.EStatModifier.neutral,
                stat: ESKillStatType.MAX_NR_OF_MODULES,
                values: [5, 10, 50, 100, 200]
            }
        },
    }

    export function getSkillInfo(statType : ESkillStatType) : ISkillInfo {
        return skillTypeToSkillInfoMap[statType];
    }
}