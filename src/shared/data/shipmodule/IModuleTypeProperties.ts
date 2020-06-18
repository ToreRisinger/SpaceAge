import { IModuleStatGenerationConfig } from "./IModuleStatGenerationConfig";

export interface IModuleTypeProperties {
    base : Array<IModuleStatGenerationConfig>,
    possibleExtraStats : Array<IModuleStatGenerationConfig>
}