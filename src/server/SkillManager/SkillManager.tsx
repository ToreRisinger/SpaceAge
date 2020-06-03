import { ICharacter } from "../../shared/interfaces/ICharacter";
import { Skills } from "../../shared/skills/Skills";
import { IClient } from "../interfaces/IClient";
import { ComManager } from "../ComManager";
import { Stats } from "../../shared/stats/Stats";

interface IClientSkillMapping {
    client: IClient,
    skillType: Stats.EStatType
    
}

export class SkillManager {

    private clientToSkillMap : Map<number, IClientSkillMapping> = new Map();
    private comManager : ComManager;
    
    constructor(comManager : ComManager) {
        this.comManager = comManager;
    }

    public update1min() {
        this.comManager.getClients().forEach(client => {
            let currentlyTraining : Stats.EStatType | undefined = client.character.skills.currentlyTraining;
            if(currentlyTraining) {

                let clientSkillMapping : IClientSkillMapping | undefined = this.clientToSkillMap.get(client.id);
                if(clientSkillMapping == undefined) {
                    this.clientToSkillMap.set(client.id, {client: client, skillType: currentlyTraining})
                } else if(clientSkillMapping.skillType != currentlyTraining) {
                    this.clientToSkillMap.set(client.id, {client: client, skillType: currentlyTraining})
                } else {
                    //@ts-ignore
                    let skill : Skills.ISkill = client.character.skills.skillList.get(currentlyTraining);
                    skill.progress = skill.progress + 1;
                    //@ts-ignore
                    client.character.skills.skillList[currentlyTraining] = skill;
                }
            }
        })
    }

    public startTrainSkill(client: IClient, skillType: Stats.EStatType) {
        //@ts-ignore
        if(client.character.skills.skillList[skillType] != undefined) {
            client.character.skills.currentlyTraining = skillType;
        }
    }

    public stopTrainSkill(client: IClient) {
        client.character.skills.currentlyTraining = undefined;
    }

}