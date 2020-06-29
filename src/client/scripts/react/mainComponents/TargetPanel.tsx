import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ObjectInfoPanel from "./ObjectInfoPanel";
import ContextMenu from "../actions/ContextMenu";

export interface TargetPanelProps { object: RadarDetectable | undefined }

export default class TargetPanel extends React.Component<TargetPanelProps, {}> {

   constructor(props : TargetPanelProps) {
      super(props)
   }

   render() {
         return (
            <div id="target_panel" style={{visibility: this.props.object != undefined ? 'visible' : 'hidden' }}>
               <ObjectInfoPanel object={this.props.object} ></ObjectInfoPanel>
               
            </div>
         );
   }
}