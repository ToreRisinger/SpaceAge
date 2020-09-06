import { ICargo } from "../ICargo";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IShip } from "./IShip";
import { IWarpState } from "../IWarpState";
import { IDockingState } from "../IDockingState";
import { IOreProcessingState } from "../IOreProcessingState";
import { IManufacturingState } from "../IManufacturingState";

export interface ICharacter extends IShip {
    cargo: ICargo,
    location: string,
    sectorId: number,
    skills: ICharacterSkills,
    warpState: IWarpState,
    dockingState: IDockingState,
    oreProcessingState: IOreProcessingState,
    manufactruingState: IManufacturingState,
    money: number
}