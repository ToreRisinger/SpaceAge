import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { Skills } from "../../../../../shared/skills/Skills";

export interface SkillContainerProps {
    skill: Skills.ISkill
}

export default class SkillContainer extends React.Component<SkillContainerProps, {}> {

    constructor(props : SkillContainerProps) {
        super(props)
    }

    render() {
        return (
            <div id="skill_container">
                {Skills.getSkillInfo(this.props.skill.skillType).name}
            </div>
        );
    }
}