import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { ICargo } from "./ICargo";
import { Skills } from "../skills/Skills";

export interface ICharacter {
    name: string,
    cargo: ICargo,
    sectorCoords: {
        x: number,
        y: number
    },
    skills: Array<Skills.ISkill>,
    location: string,
    ship: ObjectInterfaces.IShip
}