import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { ICargo } from "./ICargo";
import { Skills } from "../skills/Skills";
import { Stats } from "../stats/Stats";

export interface ICharacter {
    name: string,
    cargo: ICargo,
    sectorCoords: {
        x: number,
        y: number
    },
    skills: {
        skillList : Skills.ISkillList
        currentlyTraining: Stats.EStatType | undefined
    }
    location: string,
    ship: ObjectInterfaces.IShip
}