import { ICargo } from "../ICargo";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IShip } from "./IShip";
import { IWarpState } from "../IWarpState";

export interface ICharacter extends IShip {
    cargo: ICargo,
    location: string,
    sectorId: number,
    skills: ICharacterSkills,
    warpState: IWarpState,
    money: number
}