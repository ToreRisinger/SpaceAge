import React from "react";
import ToggleRadarRangeButton from "./ToggleRadarRangeButton";
import ToggleWeaponRangeButton from "./ToggleWeaponRangeButton";
import ToggleMiningRangeButton from "./ToggleMiningRangeButton";

export default class TopButtonPanel extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
         return (
            <div id="top_button_panel" className="Unselectable">
               <ToggleRadarRangeButton/>
               <ToggleWeaponRangeButton/>
               <ToggleMiningRangeButton/>
            </div>
         );
   }
}