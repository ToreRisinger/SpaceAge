import React from "react";
import { ObjectInterfaces } from "./../../../../shared/scripts/ObjectInterfaces";

export interface BottomPanelProps { ship : ObjectInterfaces.IShip | undefined; }

export default class BottomPanel extends React.Component<BottomPanelProps, {}> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : BottomPanelProps) {
      super(props)
   }

   render() {
        if(this.props.ship != undefined) {
            return (
                <div id="ship_stats" className="UIComponent BottomPanelElement Unselectable">
                    <h1>Speed: {Math.round(this.props.ship.speed)}</h1>
                    <h1>Shield: {this.props.ship.properties.currentShield}/{this.props.ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield]}</h1> 
                    <h1>Armor: {this.props.ship.properties.currentArmor}/{this.props.ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor]}</h1> 
                    <h1>Hull: {this.props.ship.properties.currentHull}/{this.props.ship.stats[ObjectInterfaces.ShipStatTypeEnum.hull]}</h1> 
                </div>
            );
        } else {
            return (   
                <div id="ship_stats" className="UIComponent BottomPanelElement Unselectable">
                    <h1>Speed: 0/0</h1>
                    <h1>Shield: 0/0</h1> 
                    <h1>Armor: 0/0</h1> 
                    <h1>Hull: 0/0</h1> 
                </div>
            );
        } 
   }
}