import React, { Fragment }  from "react";

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
                <div id="map_window" className="UIComponent SidePanelWindow"></div>
            }
            </Fragment>
        );
    }
}