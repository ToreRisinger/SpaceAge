import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";

export interface NavigationRowProps { object : RadarDetectable}

export default class NavigationRow extends React.Component<NavigationRowProps, { }> {

    constructor(props : NavigationRowProps) {
        super(props)
        this.onSelectObject = this.onSelectObject.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onSelectObject() {
        this.props.object.select();
    }

    onMouseEnter() {
        this.props.object.setIsHover(true);
    }

    onMouseLeave() {
        this.props.object.setIsHover(false);
    }

    render() {
        let iconPath = this.props.object.getIconPath();
        let rowClassString = "navigation_row Unselectable ";
        if(this.props.object.isTarget()) {
            rowClassString += "navigation_row_target";
        } else if(this.props.object.isSelected()) {
            rowClassString += "navigation_row_selected";
        } else {
            rowClassString += "navigation_row_base";
        }

        return (
            <div className={rowClassString} onClick={this.onSelectObject} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
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