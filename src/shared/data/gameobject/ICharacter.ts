import { ICargo } from "../ICargo";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IShip } from "./IShip";
import { IWarpState } from "../IWarpState";
import { IDockingState } from "../IDockingState";
import { IOreProcessingState } from "../IOreProcessingState";

export interface ICharacter extends IShip {
    cargo: ICargo,
    location: string,
    sectorId: number,
    skills: ICharacterSkills,
    warpState: IWarpState,
    dockingState: IDockingState,
    oreProcessingState: IOreProcessingState,
    money: number
}