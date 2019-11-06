import React from "react";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "../../modules/GlobalData";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel";

export interface BottomPanelState { ship : ObjectInterfaces.IShip | undefined; }

export default class BottomPanel extends React.Component<{}, BottomPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
        ship: undefined
      }
      this.timerID = undefined;
   }

   componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        100
      );
    }
  
    componentWillUnmount() {
      if(this.timerID != undefined) {
         clearInterval(this.timerID);
      }
    }
  
    tick() {
      this.setState({
        ship: GlobalData.getPlayerShipData()
      });
    }

   render() {
      return (
         <div id="bottom_panel" className="UIComponent">
            <ShipStatsBottomPanel ship={this.state.ship}/>
         </div>
      );
   }
}