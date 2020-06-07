import React, { Fragment } from "react";
import { Skills } from "../../../../../shared/skills/Skills";
import { Stats } from "../../../../../shared/stats/Stats";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/scripts/Events";

export interface SkillContainerProps {
    skill: Skills.ISkill,
    currentlyTraining: boolean,
    skillIndex: number;
}

export default class SkillContainer extends React.Component<SkillContainerProps, {}> {

    private SECONDS_IN_A_MINUTE : number = 60;
    private SECONDS_IN_AN_HOUR : number = 60 * this.SECONDS_IN_A_MINUTE;
    private SECONDS_IN_A_DAY : number = 24 * this.SECONDS_IN_AN_HOUR;
    

    constructor(props : SkillContainerProps) {
        super(props)
    }

    onStopOrTrain() {
        if(this.props.currentlyTraining) {
            let event : Events.TRAIN_SKILL_STOP_CONFIG = {
                eventId : Events.EEventType.TRAIN_SKILL_STOP,
                data : { }
            }
            EventHandler.pushEvent(event);
        } else {
            let event : Events.TRAIN_SKILL_START_CONFIG = {
                eventId : Events.EEventType.TRAIN_SKILL_START,
                data : {
                    skillIndex: this.props.skillIndex
                }
            }
            EventHandler.pushEvent(event);
        }
    }

    render() {
        const skill = this.props.skill;
        const skillInfo = Skills.getSkillInfo(this.props.skill.skillType);
        const skillName = skillInfo.name;
        const maxLevel = skillInfo.maxLevel;
        const currentLevel = skill.level;
        let nextLevel = currentLevel + 1 > maxLevel ? maxLevel : currentLevel + 1;
        const currentProgress = skill.progress;
        const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, currentLevel - 1));
        let modifier: Stats.EStatModifier = skillInfo.stats.modifier;
        let statType: Stats.EStatType = skillInfo.stats.stat;
        let progressPercentage = currentProgress > maxProgress ? 100 : (currentProgress / maxProgress) * 100;
        const hasNextLevel = currentLevel < nextLevel;
        const className = "Unselectable " + (this.props.currentlyTraining ? "SkillContainerInTraining": "");
        
        return (
            <div id="skill_container" className={className}>
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
                        <div className="SkillField">
                            <span>Next level: </span>
                            {this.getEffect(skillInfo, nextLevel, modifier)}
                        </div>
                        <div className="SkillField">
                            <span>Total time: </span>
                            {this.getTimeText(maxProgress)}
                        </div>
                        <div className="SkillField">
                            <span>Remaining: </span>
                            {this.getTimeText(maxProgress - currentProgress)} 
                        </div>
                        <div id="skill_train_button" className="SkillField" onClick={(e) => this.onStopOrTrain()}>
                            {this.props.currentlyTraining ?
                                "Stop"
                                :
                                "Train"
                            }
                        </div>
                        <div id="skill_train_bar" className="SkillField">
                            <div id="skill_train_bar_progress" style={{width: progressPercentage + "%"}}></div>
                            <div id="skill_train_bar_progress_text">
                                {currentProgress > maxProgress ?
                                    "100%"
                                    : currentProgress == 0 ?
                                        "0%"
                                        : Math.floor((currentProgress/maxProgress) * 100) + "%"
                                }
                            </div>
                        </div>
                    </Fragment>
                    : 
                    <Fragment></Fragment>
                }
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

    getTimeText(inputSeconds: number) : string {
        let days : number = Math.floor(inputSeconds/this.SECONDS_IN_A_DAY);
        let hourSeconds : number = inputSeconds % this.SECONDS_IN_A_DAY;
        let hours : number = Math.floor(hourSeconds / this.SECONDS_IN_AN_HOUR);
        let minuteSeconds : number = hourSeconds % this.SECONDS_IN_AN_HOUR;
        let minutes : number = Math.floor(minuteSeconds / this.SECONDS_IN_A_MINUTE);
        let remainingSeconds = minuteSeconds % this.SECONDS_IN_A_MINUTE;
        let seconds = Math.ceil(remainingSeconds);

        let text = "";
        if(Math.floor(days) > 0) {
            text += days + "d ";
        }

        if(Math.floor(hours) > 0) {
            text += hours + "h ";
        }

        if(Math.floor(minutes) > 0) {
            text += minutes + "m ";
        }

        if(Math.floor(seconds) > 0) {
            text += seconds + "s ";
        }

        if(text.length == 0) {
            text = "0s ";
        }

        return text;
    }
}