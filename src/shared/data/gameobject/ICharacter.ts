import { ICargo } from "../ICargo";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IPosition } from "../IPosition";
import { IShip } from "./IShip";
import { IWarpState } from "../IWarpState";

export interface ICharacter extends IShip {
    cargo: ICargo,
    location: string,
    sectorCoords: IPosition,
    skills: ICharacterSkills,
    warpState: IWarpState
}