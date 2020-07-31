
import WindowHeader from "../windows/WindowHeader";
import SkillsContainer from "./SkillsContainer";
import React, { Fragment } from "react";

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
                    <div id="skills_window" className="BodyText SidePanelWindow PanelBackgroundNoAlpha">
                        <WindowHeader text="Skills"/>
                        <SkillsContainer/>
                    </div>
                }
            </Fragment>
        );
    }
}