import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import NavigationRow from "./NavigationRow";
import { EventHandler } from "./../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";

export interface NavigationContainerProps { itemsToList : Array<RadarDetectable>; }
export interface NavigationContainerState { selectedId : number }

export default class NavigationContainer extends React.Component<NavigationContainerProps, NavigationContainerState> {

    private registeredEvents : boolean = false;

    constructor(props : NavigationContainerProps) {
        super(props)
        this.state = {
            selectedId : -1
        }
        this.onNewSelection = this.onNewSelection.bind(this);
        
    }

    onNewSelection(event: Events.OBJECT_SELECTED_EVENT_CONFIG) {
        this.setState({
            selectedId: event.data.object.id
        });
    }

    render() {
        if(!this.registeredEvents) {
            if(EventHandler.isInitialized()) {
                EventHandler.on(Events.EEventType.OBJECT_SELECTED_EVENT, this.onNewSelection)
                this.registeredEvents = true;
            }
        }

        return (
            <div id="navigation_container">
                {this.props.itemsToList.map((object, i) => <NavigationRow object={object} key={i} selected={this.state.selectedId == object.getGameObjectData().id}/>)}
            </div>
        );
    }
}