import React from "react";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel";
import { GlobalDataService } from "../../modules/GlobalDataService";

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
      let globalData = GlobalDataService.getInstance();
      this.setState({
        ship: globalData.getPlayerShip().getShipData()
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