import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { Skills } from "../../../../../shared/skills/Skills";
import { Stats } from "../../../../../shared/stats/Stats";
import SkillContainer from "./SkillContainer";

export default class SkillsContainer extends React.Component<{}, {}> {

    private skillList: Skills.ISkillList;

    constructor(props : {}) {
        super(props)
        this.skillList = GlobalDataService.getInstance().getCharacter().skills.skillList//Array.from(GlobalDataService.getInstance().getCharacter().skills.skillList.values());
    }

    render() {
        return (
            <div id="skills_container">
                <SkillContainer skill={this.skillList[Stats.EStatType.max_nr_of_modules]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.acceleration]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.max_speed]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.thrust]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.power]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.hull]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.armor]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.shield]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.radar_range]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.shield_generation]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.armor_impact_resistance]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.armor_heat_resistance]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.armor_explosion_resistance]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.target_dodge_reduction]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.radar_signature_reduction]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.cargo_hold]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.dodge]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.radar_signature_reduction]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.weapon_range]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.explosive_dps]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.impact_dps]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.heat_dps]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.normal_dps]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.mining_laser_strength]} training={false} />
                <SkillContainer skill={this.skillList[Stats.EStatType.mining_laser_range]} training={false} />
            </div>
        );
    }
}