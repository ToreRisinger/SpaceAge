import React from "react";
import { GameObject } from "../../game_objects/GameObject";
import { Ship } from "../../game_objects/Ship";
import ObjectInfoContainer from "./ObjectInfoContainer";
import { Asteroid } from "../../game_objects/Asteroid";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { AsteroidData } from "../../../../shared/scripts/AsteroidData";
import ObjectInfoPanel from "./ObjectInfoPanel";
import { object } from "prop-types";

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