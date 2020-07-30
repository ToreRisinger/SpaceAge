import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";

export interface MapWindowProps {
    window_open: boolean
}

export default class MapWindow extends React.Component<MapWindowProps, {}> {

    constructor(props : MapWindowProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="map_window" className="BodyText SidePanelWindow PanelBackgroundNoAlpha">
                        <WindowHeader text="Map"/>
                    </div>
                }
            </Fragment>
        );
    }
}