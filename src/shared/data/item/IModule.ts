import { IModuleStat } from "./IModuleStat";

export interface IModule {
    quality : number,
    stats : Array<IModuleStat>
}