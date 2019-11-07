import React from "react";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";

export interface ShipStatsBottomPanelProps { ship : ObjectInterfaces.IShip | undefined; }

export default class ShipStatsBottomPanel extends React.Component<ShipStatsBottomPanelProps, {}> {

   constructor(props : ShipStatsBottomPanelProps) {
      super(props)
   }

   render() {
        if(this.props.ship != undefined) {
            return (
                <div id="ship_stats_bottom_panel" className="UIComponent BottomPanelElement Unselectable">
                    <h1>Speed: {Math.round(this.props.ship.meters_per_second)} m/s</h1>
                    <h1>Shield: {this.props.ship.properties.currentShield}/{this.props.ship.stats[ObjectInterfaces.EShipStatType.shield]}</h1> 
                    <h1>Armor: {this.props.ship.properties.currentArmor}/{this.props.ship.stats[ObjectInterfaces.EShipStatType.armor]}</h1> 
                    <h1>Hull: {this.props.ship.properties.currentHull}/{this.props.ship.stats[ObjectInterfaces.EShipStatType.hull]}</h1> 
                </div>
            );
        } else {
            return (   
                <div id="ship_stats_bottom_panel" className="UIComponent BottomPanelElement Unselectable">
                    <h1>Speed: 0/0</h1>
                    <h1>Shield: 0/0</h1> 
                    <h1>Armor: 0/0</h1> 
                    <h1>Hull: 0/0</h1> 
                </div>
            );
        } 
   }
}