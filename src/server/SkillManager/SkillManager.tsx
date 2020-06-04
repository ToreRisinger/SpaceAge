import { Skills } from "../../shared/skills/Skills";
import { IClient } from "../interfaces/IClient";
import { ComManager } from "../ComManager";
import { Stats } from "../../shared/stats/Stats";
import { Events } from "../../shared/scripts/Events";

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
        this.updateSkillProgress();
    }

    public startTrainSkill(client: IClient,  event: Events.TRAIN_SKILL_START_CONFIG) {
        //@ts-ignore
        if(client.character.skills.skillList[event.data.skill] != undefined ) {
            //@ts-ignore
            let skill : Skills.ISkill = client.character.skills.skillList[event.data.skill];
            let skillInfo = Skills.getSkillInfo(skill.skillType);
            if(skill.level < skillInfo.maxLevel) {
                client.character.skills.currentlyTraining = event.data.skill;
            }
        }
    }

    public stopTrainSkill(client: IClient) {
        client.character.skills.currentlyTraining = undefined;
        this.clientToSkillMap.delete(client.id)
    }

    private updateSkillProgress() : void {
        this.comManager.getClients().forEach(client => {
            let currentlyTraining : Stats.EStatType | undefined = client.character.skills.currentlyTraining;
            if(currentlyTraining != undefined) {
                let clientSkillMapping : IClientSkillMapping | undefined = this.clientToSkillMap.get(client.id);
                if(clientSkillMapping == undefined) {
                    this.clientToSkillMap.set(client.id, {client: client, skillType: currentlyTraining})
                } else if(clientSkillMapping.skillType != currentlyTraining) {
                    this.clientToSkillMap.set(client.id, {client: client, skillType: currentlyTraining})
                } else {
                    //@ts-ignore
                    let skill : Skills.ISkill = client.character.skills.skillList[currentlyTraining];
                    skill.progress = skill.progress + 60;
                    let skillInfo = Skills.getSkillInfo(skill.skillType);
                    const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, skill.level - 1));
                    if(skill.progress >= maxProgress) {
                        this.upgradeSkillLevel(skill, skillInfo, client);
                    }

                    //@ts-ignore
                    client.character.skills.skillList[currentlyTraining] = skill;
                }
            }
        })
    }

    private upgradeSkillLevel(skill: Skills.ISkill, skillInfo: Skills.ISkillInfo, client: IClient) {
        skill.level = skill.level + 1;
        skill.progress = 0;
        this.stopTrainSkill(client);

        if(skill.level >= skillInfo.maxLevel) {
            skill.level = skillInfo.maxLevel;
            this.stopTrainSkill(client);
        }
    }
}