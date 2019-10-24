import React from "react";
import { Chat } from "./../../modules/Chat"
import { RadarDetectable } from "../../game_objects/RadarDetectable";

export interface NavigationRowProps { object : RadarDetectable; }

export default class NavigationRow extends React.Component<NavigationRowProps, {}> {

    constructor(props : NavigationRowProps) {
        super(props)
    }

    render() {
        let iconPath = "assets/sprite/" + this.props.object.getIconPath();
        return (
            
            <div className="navigation_row Unselectable">
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