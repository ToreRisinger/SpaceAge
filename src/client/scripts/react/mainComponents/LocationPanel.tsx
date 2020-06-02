import React from "react";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { Ship } from "../../game_objects/Ship";
import LocationInfoPanel from "./LocationInfoPanel";

export interface LocationPanelState { ship: Ship }

export default class LocationPanel extends React.Component<{}, LocationPanelState> {

   constructor(props : {}) {
      super(props)
      this.state = {
          ship : GlobalDataService.getInstance().getPlayerShip()
      }
   }

   render() {
         return (
            <div id="location_panel">
               <LocationInfoPanel/>
            </div>
         );
   }
}