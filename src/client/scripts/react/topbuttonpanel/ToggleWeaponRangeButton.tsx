import React from "react";
import { GraphicsEffects } from "../../modules/graphics/GraphicEffects";

export interface ToggleWeaponRangeButtonState { selected: boolean }

export default class ToggleWeaponRangeButton extends React.Component<{}, ToggleWeaponRangeButtonState> {

   constructor(props : {}) {
      super(props)
      this.state = {
         selected : false
      }
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      GraphicsEffects.setShowWeaponRange(!this.state.selected);
      this.setState({
         selected : !this.state.selected
      })
   }
   render() {
      const className = this.state.selected ? "SelectedTopPanelButton" : "";
      return (
         <div id="toggle_weapon_range_button" className={className + " TopPanelButton"} onClick={(e) => this.onClick()}>
            WR
         </div>
      );
   }
}