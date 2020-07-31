import { IStatModificationDef } from "./IStatModificationDef";

export interface ISkillStatModificationDef extends IStatModificationDef {
    baseValue: number,
    increase: number
}