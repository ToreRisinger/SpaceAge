import React, { Fragment } from "react";
import { Skills } from "../../../../../shared/skills/Skills";
import { Stats } from "../../../../../shared/stats/Stats";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/scripts/Events";

export interface SkillContainerProps {
    skill: Skills.ISkill,
    currentlyTraining: Stats.EStatType | undefined
}

export default class SkillContainer extends React.Component<SkillContainerProps, {}> {

    /*
        Make tooltip:

        <div id="skill_description" className="SkillField">
            {description}
        </div>
    */

    constructor(props : SkillContainerProps) {
        super(props)
        this.getEffect.bind(this);
        this.onTrain.bind(this);
    }

    onTrain() {
        let event : Events.TRAIN_SKILL_START_CONFIG = {
            eventId : Events.EEventType.TRAIN_SKILL_START,
            data : {
                skill: this.props.skill.skillType
            }
        }
        EventHandler.pushEvent(event);
    }

    

    render() {
        const skill = this.props.skill;
        const skillInfo = Skills.getSkillInfo(this.props.skill.skillType);
        const description = skillInfo.description;
        const skillName = skillInfo.name;
        const maxLevel = skillInfo.maxLevel;
        const currentLevel = skill.level;
        let nextLevel = skill.level + 1;
        const currentProgress = skill.progress;
        const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, currentLevel - 1));
        if(nextLevel > maxLevel) {
            nextLevel = maxLevel;
        }
        let modifier: Stats.EStatModifier = skillInfo.stats.modifier;
        let statType: Stats.EStatType = skillInfo.stats.stat;
        let progressPercentage = currentProgress > maxProgress ? 100 : (currentProgress / maxProgress) * 100;
        const hasNextLevel = currentLevel < nextLevel;
        return (
            <div id="skill_container" className="Unselectable">
                <div id="skill_title" className="SkillField">
                    <u>{skillName}</u>
                </div>
                <div id="skill_level" className="SkillField">
                    {"Level: " + currentLevel + "/" + maxLevel}
                </div>
                <div id="skill_current_effect" className="SkillField">
                    {Stats.statTypeToString(statType) + ": "}
                    {this.getEffect(skillInfo, currentLevel, modifier)}
                </div>  
                {hasNextLevel ?
                    <Fragment>
                        <span>Next: </span>
                        {this.getEffect(skillInfo, nextLevel, modifier)}
                    </Fragment>
                    : {}
                }
                <div id="skill_train_button" className="SkillField" onClick={(e) => this.onTrain()}>
                    Train
                </div>
                <div id="skill_train_bar" className="SkillField">
                    <div id="skill_train_bar_progress" style={{width: progressPercentage + "%"}}></div>
                    <div id="skill_train_bar_progress_text">
                        {currentProgress > maxProgress ?
                            maxProgress + "/" + maxProgress
                            :
                            currentProgress + "/" + maxProgress
                        }
                    </div>
                </div>
            </div>
        );
    }

    getEffect(skillInfo: Skills.ISkillInfo, level: number, modifier: Stats.EStatModifier) {
        return (
            <span style={{color: Stats.statModifierColor(modifier)}}>
                            {Stats.statModifierToString(modifier) + skillInfo.stats.values[level - 1] 
                                + (modifier == Stats.EStatModifier.increase_percentage || modifier == Stats.EStatModifier.decrease_percentage ? "%" : "")}
            </span>
        )
    }
}