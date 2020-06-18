import { ISkill } from "./ISkill";

export interface ICharacterSkills {
    skillList : Array<ISkill>
    currentlyTrainingIndex: number
}