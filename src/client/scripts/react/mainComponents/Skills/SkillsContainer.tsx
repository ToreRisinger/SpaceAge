import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { Skills } from "../../../../../shared/skills/Skills";
import SkillContainer from "./SkillContainer";

export default class SkillsContainer extends React.Component<{}, {}> {

    private skillList: Array<Skills.ISkill>;

    constructor(props : {}) {
        super(props)
        this.skillList = GlobalDataService.getInstance().getCharacter().skills
    }

    render() {
        return (
            <div id="skills_container">
                {this.skillList.map((object, i) => <SkillContainer skill={object} key={i} />)}
            </div>
        );
    }
}