import React from "react";
import { GameObject } from "../../game_objects/GameObject";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel"
import { Ship } from "../../game_objects/Ship";

export interface SelectionPanelProps { selectedObject: GameObject | undefined }

export default class SelectionPanel extends React.Component<SelectionPanelProps, {}> {

   constructor(props : SelectionPanelProps) {
      super(props)
   }

   render() {
         return (
            <div id="selection_panel" style={{visibility: this.props.selectedObject != undefined ? 'visible' : 'hidden' }} className="UIComponent">
               {this.props.selectedObject instanceof Ship ? <ShipStatsBottomPanel ship={this.props.selectedObject.getShipData()}/> : ""}
            </div>
         );
   }
}