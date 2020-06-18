import { EStatType } from "../stats/EStatType";

export interface ISkill {
    skillType: EStatType,
    level: number,
    progress: number
}