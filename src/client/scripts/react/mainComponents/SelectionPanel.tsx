import React from "react";
import { GlobalData } from "../../modules/GlobalData";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";

export interface SelectionPanelProps { selectedObject: ObjectInterfaces.IGameObject | undefined }

export default class SelectionPanel extends React.Component<SelectionPanelProps, {}> {

   constructor(props : SelectionPanelProps) {
      super(props)
   }

   render() {
        return (
            <div id="selection_panel" style={{visibility: this.props.selectedObject != undefined ? 'visible' : 'hidden' }} className="UIComponent">
               
            </div>
        );
   }
}