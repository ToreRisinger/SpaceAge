import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";

export interface IModuleStatGenerationConfig {
    stat: EStatType,
    modifier: EStatModifier,
    baseMin: number,
    baseMax: number,
    increase: number
}