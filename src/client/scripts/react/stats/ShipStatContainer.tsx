import React from "react";
import { CShip } from "../../game_objects/CShip";
import SpeedStatDisplay from "./SpeedStatDisplay";
import ShieldStatDisplay from "./ShieldStatDisplay";
import ArmorStatDisplay from "./ArmorStatDisplay";
import HullStatDisplay from "./HullStatDisplay";

export interface ShipStatContainerProps {
    ship : CShip
}

export default class ShipStatContainer extends React.Component<ShipStatContainerProps, {}> {

    constructor(props : ShipStatContainerProps) {
        super(props)
    }

    render() {
        return (
            <div className="ShipStatContainer Unselectable BodyText">
               <SpeedStatDisplay ship={this.props.ship}></SpeedStatDisplay>
               <ShieldStatDisplay ship={this.props.ship}></ShieldStatDisplay>
               <ArmorStatDisplay ship={this.props.ship}></ArmorStatDisplay>
               <HullStatDisplay ship={this.props.ship}></HullStatDisplay>
             </div>
        );
    }
}