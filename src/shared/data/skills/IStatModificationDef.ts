import { EStatType } from "../stats/EStatType";
import { EStatModifier } from "../stats/EStatModifier";


export interface IStatModificationDef {
    stat: EStatType,
    modifier: EStatModifier,
}