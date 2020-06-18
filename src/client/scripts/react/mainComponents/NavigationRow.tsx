import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { Utils } from "../../../../shared/util/Utils";

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
        let rowClassString = "navigation_row BackgroundHoverHighlight ";
        
        if(this.props.object.isTarget()) {
            rowClassString += "navigation_row_target";
        } else if(this.props.object.isSelected()) {
            rowClassString += "navigation_row_selected";
        }

        return (
            <div className={rowClassString} onClick={this.onSelectObject} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <img className="navigation_row_icon" src={iconPath}/>
                <div className="navigation_row_name">
                   {this.props.object.getCharacterName()}
                </div>
                <div className="navigation_row_distance">
                    {Utils.formatMeters(this.props.object.getDistanceToPlayerShip())}
                </div>  
            </div>
        );
    }
}