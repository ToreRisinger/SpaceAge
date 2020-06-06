import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ObjectInfoPanel from "./ObjectInfoPanel";

export interface SelectionPanelProps { object: RadarDetectable | undefined }

export default class SelectionPanel extends React.Component<SelectionPanelProps, {}> {

   constructor(props : SelectionPanelProps) {
      super(props)
   }

   render() {
         return (
            <div id="selection_panel" style={{visibility: this.props.object != undefined ? 'visible' : 'hidden' }}>
               <ObjectInfoPanel object={this.props.object} ></ObjectInfoPanel>
            </div>
         );
   }
}