import { EModuleItemType } from "./item/EModuleItemType";

export interface IManufacturingType {
    moduleType: EModuleItemType,
    quality: number
}

export interface IManufacturingState {
    isManufacturing: boolean,
    module: IManufacturingType | undefined,
    startTime: number
}