import React from "react";
import { GameObject } from "../../game_objects/GameObject";
import { Ship } from "../../game_objects/Ship";
import ObjectInfoContainer from "./ObjectInfoContainer";
import { Asteroid } from "../../game_objects/Asteroid";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { AsteroidData } from "../../../../shared/scripts/AsteroidData";
import { Stats } from "../../../../shared/stats/Stats";

export interface ObjectInfoPanelProps { object: RadarDetectable | undefined }

export default class ObjectInfoPanel extends React.Component<ObjectInfoPanelProps, {}> {

   constructor(props : ObjectInfoPanelProps) {
      super(props)
   }

   render() {
         let fields : Array<string> = this.getSelectionContainerFields(this.props.object);
         let description : string | undefined = this.getSelectedObjectDescription(this.props.object);

         return (
            <div id="object_info_panel" className="UIComponent">
               {this.props.object != undefined ? <ObjectInfoContainer title={this.props.object.getDisplayName()} fields={fields} description={description} centerFields={false}/> : ""}
            </div>
         );
   }

   getSelectionContainerFields(selectedObject : GameObject | undefined) : Array<string> {
      let ret : Array<string> = new Array<string>();
      if(selectedObject instanceof Ship) {
         ret.push("Speed:  " + Math.round(selectedObject.getData().state.meters_per_second) + " m/s");
         ret.push("Shield: " + selectedObject.getData().properties.currentShield);
         ret.push("Armor:  " + selectedObject.getData().properties.currentArmor);
         ret.push("Hull:   " + selectedObject.getData().properties.currentHull);
         ret.push("Mass:   " + selectedObject.getData().stats[Stats.EStatType.mass] + " kg");
      } else if(selectedObject instanceof Asteroid) {
         let asteroidInfo = AsteroidData.getAsteroidInfo(selectedObject.getAsteroidData().type);
         ret.push("Hardness: " + selectedObject.getAsteroidData().hardness);
         ret.push("Mineral:  " + asteroidInfo.mineral);
         ret.push("Size:   " + Math.round(selectedObject.getAsteroidData().size) + " m²");
         ret.push("Mass:   " + Math.round(selectedObject.getAsteroidData().size * asteroidInfo.massPerM2) + " kg");
      }
      return ret;
   }

   getSelectedObjectDescription(selectedObject : GameObject | undefined) : string | undefined {
      if(selectedObject instanceof Asteroid) {
        return AsteroidData.getAsteroidInfo(selectedObject.getAsteroidData().type).description;
      }

      return undefined;
   }
}