import React from "react";
import { Stats } from "../../../../shared/stats/Stats";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";
import ObjectInfoContainer from "./ObjectInfoContainer";

export interface ShipStatsBottomPanelProps { character : ICharacter; }

export default class ShipStatsBottomPanel extends React.Component<ShipStatsBottomPanelProps, {}> {

   constructor(props : ShipStatsBottomPanelProps) {
      super(props)
   }

   render() {
        let fields : Array<string> = new Array();
        fields.push("Speed: " + Math.round(this.props.character.state.meters_per_second) + " m/s");
        fields.push("Shield: " + this.props.character.properties.currentShield + "/" + this.props.character.stats[Stats.EStatType.shield]);
        fields.push("Armor: " + this.props.character.properties.currentArmor + "/" + this.props.character.stats[Stats.EStatType.armor]);
        fields.push("Hull: " + this.props.character.properties.currentHull + "/" + this.props.character.stats[Stats.EStatType.hull]);

        return (
            <div id="ship_stats_bottom_panel" className="BottomPanelElement BodyText">
               <ObjectInfoContainer title={undefined} fields={fields} description={undefined} centerFields={true}/>
            </div>
        );   
   }
}