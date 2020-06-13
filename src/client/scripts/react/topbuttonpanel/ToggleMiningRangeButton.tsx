import React from "react";
import { GraphicsEffects } from "../../modules/graphics/GraphicEffects";

export interface ToggleMiningRangeButtonState { selected: boolean }

export default class ToggleMiningRangeButton extends React.Component<{}, ToggleMiningRangeButtonState> {

   constructor(props : {}) {
      super(props)
      this.state = {
         selected : false
      }
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      GraphicsEffects.setShowMiningRange(!this.state.selected);
      this.setState({
         selected : !this.state.selected
      })
   }

   render() {
      const className = this.state.selected ? "SelectedTopPanelButton" : "";
      return (
         <div id="toggle_mining_range_button" className={className + " TopPanelButton"} onClick={(e) => this.onClick()}>
            MR
         </div>
      );
   }
}