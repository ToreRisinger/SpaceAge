import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";

export interface NavigationRowProps { object : RadarDetectable}

export default class NavigationRow extends React.Component<NavigationRowProps, { }> {

    constructor(props : NavigationRowProps) {
        super(props)
        this.onSelectObject = this.onSelectObject.bind(this);
    }

    onSelectObject() {
        this.props.object.select();
    }

    render() {
        let iconPath = this.props.object.getIconPath();
        let rowClassString = "navigation_row Unselectable ";
        if(this.props.object.isSelected()) {
            rowClassString += "navigation_row_selected";
        } 

        return (
            <div className={rowClassString} onClick={this.onSelectObject}>
                <img className="navigation_row_icon Unselectable" src={iconPath}/>
                <div className="navigation_row_name Unselectable">
                   Dummy name
                </div>
                <div className="navigation_row_distance Unselectable">
                    {this.props.object.getDistanceToPlayerShip()}
                </div>  
            </div>
        );
    }
}