import { ICargo } from "../ICargo";
import { IGameObject } from "./IGameObject";
import { IShipModuleInstance } from "../IShipModuleInstance";
import { IProperties } from "../IProperties";
import { ICharacterSkills } from "../skills/ICharacterSkills";
import { IPosition } from "../IPosition";
import { ICharacterState } from "../ICharacterState";

export interface ICharacter extends IGameObject {
    name: string,
    cargo: ICargo,
    location: string,
    sectorCoords: IPosition,
    skills: ICharacterSkills
    stats : Array<number>,
    properties : IProperties,
    state: ICharacterState,
    modules : Array<IShipModuleInstance>
}