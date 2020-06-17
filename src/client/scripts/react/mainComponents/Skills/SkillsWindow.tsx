import React, { Fragment } from "react";
import WindowHeader from "../../windows/WindowHeader";
import SkillsContainer from "./SkillsContainer";

export interface SkillsWindowProps {
    window_open: boolean
}

export default class SkillsWindow extends React.Component<SkillsWindowProps, {}> {

    constructor(props : SkillsWindowProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="skills_window" className="BodyText SidePanelWindow">
                        <WindowHeader text="Skills"/>
                        <SkillsContainer/>
                    </div>
                }
            </Fragment>
        );
    }
}