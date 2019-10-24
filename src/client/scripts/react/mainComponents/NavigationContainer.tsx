import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import NavigationRow from "./NavigationRow";

export interface NavigationContainer { itemsToList : Array<RadarDetectable>; }

export default class ChatContainer extends React.Component<NavigationContainer, {}> {

    constructor(props : NavigationContainer) {
        super(props)
    }

    render() {
        return (
            <div id="navigation_container">
                {this.props.itemsToList.map((object, i) => <NavigationRow object={object} key={i} />)}
            </div>
        );
    }
}