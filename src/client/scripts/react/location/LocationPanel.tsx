import React from "react";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { CCharacter } from "../../game_objects/CCharacter";
import LocationInfoPanel from "./LocationInfoPanel";

export interface LocationPanelState { ship: CCharacter }

export default class LocationPanel extends React.Component<{}, LocationPanelState> {

   constructor(props : {}) {
      super(props)
      this.state = {
          ship : GlobalDataService.getInstance().getPlayerShip()
      }
   }

   render() {
         return (
            <div id="location_panel" className="HasBorder PanelBackground">
               <LocationInfoPanel/>
            </div>
         );
   }
}