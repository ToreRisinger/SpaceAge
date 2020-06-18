import React from "react";
import ObjectInfoContainer from "./ObjectInfoContainer";
import { Ship } from "../../game_objects/Ship";
import { EStatType } from "../../../../shared/data/stats/EStatType";

export interface ShipStatsBottomPanelProps { ship : Ship; }

export default class ShipStatsBottomPanel extends React.Component<ShipStatsBottomPanelProps, {}> {

   constructor(props : ShipStatsBottomPanelProps) {
      super(props)
   }

   render() {
        let fields : Array<string> = new Array();
        fields.push("Speed: " + Math.round(this.props.ship.getMetersPerSecond()) + " m/s");
        fields.push("Shield: " + this.props.ship.getCurrentShield() + "/" + this.props.ship.getStat(EStatType.shield));
        fields.push("Armor: " + this.props.ship.getCurrentArmor() + "/" + this.props.ship.getStat(EStatType.armor));
        fields.push("Hull: " + this.props.ship.getCurrentHull() + "/" + this.props.ship.getStat(EStatType.hull));

        return (
            <div id="ship_stats_bottom_panel" className="BottomPanelElement BodyText">
               <ObjectInfoContainer title={undefined} fields={fields} description={undefined} centerFields={true}/>
            </div>
        );   
   }
}