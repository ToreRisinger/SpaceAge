import { GlobalDataService } from "../../modules/GlobalDataService";
import SkillContainer from "./SkillContainer";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import { ISkill } from "../../../../shared/data/skills/ISkill";
import React from "react";

export interface SkillsContainerState { skillList: Array<ISkill>, currentlyTrainingIndex: number }

export default class SkillsContainer extends React.Component<{}, SkillsContainerState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            skillList: GlobalDataService.getInstance().getCharacter().skills.skillList,
            currentlyTrainingIndex : GlobalDataService.getInstance().getCharacter().skills.currentlyTrainingIndex
        }
        this.onSkillStateChanged = this.onSkillStateChanged.bind(this);
        EventHandler.on(Events.EEventType.SKILL_STATE_UPDATED_EVENT, this.onSkillStateChanged)
        
    }

    onSkillStateChanged(event: Events.SKILL_STATE_UPDATED_EVENT_CONFIG) {
        this.setState({
            skillList : GlobalDataService.getInstance().getCharacter().skills.skillList,
            currentlyTrainingIndex : GlobalDataService.getInstance().getCharacter().skills.currentlyTrainingIndex
        });  
    }

    render() {
        const currentlyTrainingIndex = this.state.currentlyTrainingIndex;
        return (
            <div id="skills_container">
                 {this.state.skillList.map((object, i) => <SkillContainer skill={object} skillIndex={i} currentlyTraining={i == currentlyTrainingIndex} key={i} />)}
            </div>
        );
    }
}