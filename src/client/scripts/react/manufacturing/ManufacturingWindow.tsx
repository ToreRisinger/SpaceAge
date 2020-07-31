import React, { Fragment }  from "react";
import WindowHeader from "../windows/WindowHeader";
import ManufacturingEntry from "./ManufacturingEntry";

export interface ManufacturingWindowProps {
    window_open: boolean
}

export default class ManufacturingWindow extends React.Component<ManufacturingWindowProps, {}> {

    constructor(props : ManufacturingWindowProps) {
        super(props)
    }

    render() {
        let entries = new Array();
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        entries.push({});
        

        return (
            <Fragment>
                {this.props.window_open &&
                    <div className="ManufacturingWindow BodyText SidePanelWindow HasBorder PanelBackgroundNoAlpha Unselectable">
                        <WindowHeader text="Manufacturing"/>
                        <div className="ManufacturingFilter"></div>
                        <div className="ManufacturingList">
                            {entries.map((object, i) => <ManufacturingEntry key={i}/>)}
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}