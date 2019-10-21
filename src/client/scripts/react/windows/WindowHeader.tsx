import React, { Fragment }  from "react";

export interface ShipWindowHeader {
    text: string
}

export default class WindowHeader extends React.Component<ShipWindowHeader, {}> {

    constructor(props : ShipWindowHeader) {
        super(props)
    }

    render() {
        return (
            <div className="WindowHeader">
                <span className="WindowHeaderText">{this.props.text}</span>
                <hr></hr>
            </div>
        );
    }
}