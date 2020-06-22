import React from "react";
import { GameObject } from "../../game_objects/GameObject";
import ObjectInfoContainer from "./ObjectInfoContainer";
import { Asteroid } from "../../game_objects/Asteroid";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { AsteroidInfo } from "../../../../shared/data/astroid/AsteroidInfo";

export interface ObjectInfoPanelProps { object: RadarDetectable | undefined }

export default class ObjectInfoPanel extends React.Component<ObjectInfoPanelProps, {}> {

   constructor(props : ObjectInfoPanelProps) {
      super(props)
   }

   render() {
         let fields : Array<string> = this.props.object == undefined ? new Array() : this.props.object.getDisplayInformation();
         let description : string | undefined = this.getSelectedObjectDescription(this.props.object);

         return (
            <div id="object_info_panel">
               {this.props.object != undefined ? <ObjectInfoContainer title={this.props.object.getName()} fields={fields} description={description} centerFields={false}/> : ""}
            </div>
         );
   }

   getSelectedObjectDescription(selectedObject : GameObject | undefined) : string | undefined {
      if(selectedObject instanceof Asteroid) {
        return AsteroidInfo.getAsteroidInfo(selectedObject.getMineralType()).description;
      }

      return undefined;
   }
}