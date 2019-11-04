import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import NavigationRow from "./NavigationRow";

export interface NavigationContainerProps { itemsToList : Array<RadarDetectable> }

export default class NavigationContainer extends React.Component<NavigationContainerProps, {}> {

    constructor(props : NavigationContainerProps) {
        super(props)
    }

    render() {
        return (
            <div id="navigation_container">
                {this.props.itemsToList.filter(object => object.isDetected()).map((object, i) => <NavigationRow object={object} key={i}/>)}
            </div>
        );
    }
}