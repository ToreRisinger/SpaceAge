import React, { Fragment } from "react";
import WindowHeader from "./WindowHeader";

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
                    <div id="skills_window" className="UIComponent SidePanelWindow">
                        <WindowHeader text="Skills"/>
                    </div>
                }
            </Fragment>
        );
    }
}