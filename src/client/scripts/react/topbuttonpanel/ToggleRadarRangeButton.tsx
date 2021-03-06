import React from "react";
import { GraphicsEffects } from "../../modules/graphics/GraphicEffects";

export interface ToggleRadarRangeButtonState { selected: boolean }

export default class ToggleRadarRangeButton extends React.Component<{}, ToggleRadarRangeButtonState> {

   constructor(props : {}) {
      super(props)
      this.state = {
         selected : false
      }
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      GraphicsEffects.setShowRadarRange(!this.state.selected);
      this.setState({
         selected : !this.state.selected
      })
      
   }

   render() {
      const className = this.state.selected ? "SelectedTopPanelButton" : "";
      return (
         <div id="toggle_radar_range_button" className={className + " TopPanelButton BackgroundHoverHighlight"} onClick={(e) => this.onClick()}>
            RR
         </div>
      );
   }
}