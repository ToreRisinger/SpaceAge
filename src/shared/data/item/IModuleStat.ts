import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";

export interface IModuleStat {
    property : EStatType,
    modifier : EStatModifier,
    value : number;
}