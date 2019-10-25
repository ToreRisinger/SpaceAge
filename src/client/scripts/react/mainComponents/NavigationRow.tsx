import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { EventHandler } from "./../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";
import { GlobalData } from "../../modules/GlobalData";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";

export interface NavigationRowProps { object : RadarDetectable, selected : boolean }

export default class NavigationRow extends React.Component<NavigationRowProps, { }> {

    constructor(props : NavigationRowProps) {
        super(props)
        this.onSelectObject = this.onSelectObject.bind(this);
    }

    onSelectObject() {
        if(EventHandler.isInitialized()) {
            let event : Events.OBJECT_SELECTED_EVENT_CONFIG = {
                eventId : Events.EEventType.OBJECT_SELECTED_EVENT,
                data : { 
                    object: this.props.object.getGameObjectData()
                }
            }
            EventHandler.pushEvent(event);
        }
    }

    render() {
        let iconPath = "assets/sprite/" + this.props.object.getIconPath();
        let rowClassString = "navigation_row Unselectable ";
        if(this.props.selected) {
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