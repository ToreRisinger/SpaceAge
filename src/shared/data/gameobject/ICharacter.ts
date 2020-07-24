import { ICargo } from "../ICargo";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IShip } from "./IShip";
import { IWarpState } from "../IWarpState";
import { IDockingState } from "../IDockingState";

export interface ICharacter extends IShip {
    cargo: ICargo,
    location: string,
    sectorId: number,
    skills: ICharacterSkills,
    warpState: IWarpState,
    dockingState: IDockingState,
    money: number
}