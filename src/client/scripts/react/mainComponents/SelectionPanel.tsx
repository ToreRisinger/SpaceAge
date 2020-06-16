import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ObjectInfoPanel from "./ObjectInfoPanel";
import ContextMenu from "../actions/ContextMenu";

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
         //Todo add a button at the bottom of the pane which expands the context menu
      );
   }
} // <ContextMenu context={this.props.object}></ContextMenu>