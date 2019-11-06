import React from "react";
import { GameObject } from "../../game_objects/GameObject";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel"
import { Ship } from "../../game_objects/Ship";

export interface TargetPanelProps { targetObject: GameObject | undefined }

export default class TargetPanel extends React.Component<TargetPanelProps, {}> {

   constructor(props : TargetPanelProps) {
      super(props)
   }

   render() {
         return (
            <div id="target_panel" style={{visibility: this.props.targetObject != undefined ? 'visible' : 'hidden' }} className="UIComponent">
               {this.props.targetObject instanceof Ship ? <ShipStatsBottomPanel ship={this.props.targetObject.getShipData()}/> : ""}
            </div>
         );
   }
}