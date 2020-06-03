import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { Skills } from "../../../../../shared/skills/Skills";
import { Stats } from "../../../../../shared/stats/Stats";
import SkillContainer from "./SkillContainer";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/scripts/Events";

export interface SkillsContainerState { skillList: Skills.ISkillList, currentlyTraining: Stats.EStatType | undefined }

export default class SkillsContainer extends React.Component<{}, SkillsContainerState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            skillList: GlobalDataService.getInstance().getCharacter().skills.skillList,
            currentlyTraining : GlobalDataService.getInstance().getCharacter().skills.currentlyTraining
        }
        EventHandler.on(Events.EEventType.SKILL_STATE_EVENT, this.onSkillStateChanged)
    }

    onSkillStateChanged(event: Events.SKILL_STATE_EVENT_CONFIG) {
        this.setState({
            skillList : event.data.skills.skillList,
            currentlyTraining : event.data.skills.currentlyTraining
        });

        
    }

    render() {
        return (
            <div id="skills_container">
                <SkillContainer skill={this.state.skillList[Stats.EStatType.max_nr_of_modules]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.acceleration]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.max_speed]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.thrust]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.power]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.hull]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.armor]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.shield]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.radar_range]} currentlyTraining={this.state.currentlyTraining} />
                <SkillContainer skill={this.state.skillList[Stats.EStatType.shield_generation]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.armor_impact_resistance]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.armor_heat_resistance]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.armor_explosion_resistance]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.target_dodge_reduction]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.radar_signature_reduction]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.cargo_hold]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.dodge]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.radar_signature_reduction]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.weapon_range]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.explosive_dps]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.impact_dps]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.heat_dps]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.normal_dps]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.mining_laser_strength]} currentlyTraining={this.state.currentlyTraining}/>
                <SkillContainer skill={this.state.skillList[Stats.EStatType.mining_laser_range]} currentlyTraining={this.state.currentlyTraining}/>
            </div>
        );
    }
}