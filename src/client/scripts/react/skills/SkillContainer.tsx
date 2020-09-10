
import { SkillInfo } from "../../../../shared/data/skills/SkillInfo";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import { ISkill } from "../../../../shared/data/skills/ISkill";
import { EStatModifier } from "../../../../shared/data/stats/EStatModifier";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { StatInfo } from "../../../../shared/data/stats/StatInfo";
import ProgressBar from "../general/ProgressBar";
import React, { Fragment } from "react";

export interface SkillContainerProps {
    skill: ISkill,
    currentlyTraining: boolean,
    skillIndex: number;
}

export default class SkillContainer extends React.Component<SkillContainerProps, {}> {

    private SECONDS_IN_A_MINUTE : number = 60;
    private SECONDS_IN_AN_HOUR : number = 60 * this.SECONDS_IN_A_MINUTE;
    private SECONDS_IN_A_DAY : number = 24 * this.SECONDS_IN_AN_HOUR;
    

    constructor(props : SkillContainerProps) {
        super(props)
        this.getCurrentProgress = this.getCurrentProgress.bind(this);
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

    getCurrentProgress() {
        return this.props.skill.progress;
    }

    render() {
        const skill = this.props.skill;
        const skillInfo = SkillInfo.getSkillInfo(this.props.skill.skillType);
        const skillName = skillInfo.name;
        const maxLevel = skillInfo.maxLevel;
        const currentLevel = skill.level;
        let nextLevel = maxLevel == -1 ? currentLevel + 1 : currentLevel + 1 > maxLevel ? maxLevel : currentLevel + 1;
        const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, currentLevel));
        let modifier: EStatModifier = skillInfo.stats.modifier;
        let statType: EStatType = skillInfo.stats.stat;
        const hasNextLevel = nextLevel == -1 ? true : currentLevel < nextLevel;
        const className = "Unselectable " + (this.props.currentlyTraining ? "SkillContainerInTraining": "");
        let maxLevelText = "" + maxLevel;
        if(maxLevel == -1) {
            maxLevelText = "inf";
        }
        return (
            <div id="skill_container" className={className}>
                <div id="skill_title" className="SkillField">
                    <u>{skillName}</u>
                </div>
                <div id="skill_level" className="SkillField">
                    {"Level: " + currentLevel + "/" + maxLevelText}
                </div>
                <div id="skill_current_effect" className="SkillField">
                    {StatInfo.statTypeToString(statType) + ": "}
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
                            {this.getTimeText(maxProgress - this.getCurrentProgress())} 
                        </div>
                        <div id="skill_train_button" className="SkillField" onClick={(e) => this.onStopOrTrain()}>
                            {this.props.currentlyTraining ?
                                "Stop"
                                :
                                "Train"
                            }
                        </div>
                        <ProgressBar currentProgress={this.getCurrentProgress} totalProgress={maxProgress}/>
                    </Fragment>
                    : 
                    <Fragment></Fragment>
                }
            </div>
        );
    }

    getEffect(skillInfo: SkillInfo.ISkillInfo, level: number, modifier: EStatModifier) {
        let value: number = skillInfo.stats.baseValue + skillInfo.stats.increase * level;
        return (
            <span style={{color: StatInfo.statModifierColor(modifier)}}>
                            {StatInfo.statModifierToString(modifier) + value 
                                + (modifier == EStatModifier.increase_percentage || modifier == EStatModifier.decrease_percentage ? "%" : "")}
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