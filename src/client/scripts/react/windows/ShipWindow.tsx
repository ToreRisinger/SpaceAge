import React, { Fragment }  from "react";

export interface ShipWindowProps {
    window_open: boolean
}

export default class ShipWindow extends React.Component<ShipWindowProps, {}> {

    constructor(props : ShipWindowProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
            {this.props.window_open &&
                <div id="ship_window" className="UIComponent SidePanelWindow"></div>
            }
            </Fragment>
        );
    }
}