import React from "react";
import { ObjectInterfaces } from "./../../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "./../../modules/GlobalData";
import ShipStats from "./ShipStats";

export interface BottomPanelState { ship : ObjectInterfaces.IShip | undefined; }

export default class BottomPanel extends React.Component<{}, BottomPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
        ship: GlobalData.getPlayerShipData()
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
            <ShipStats ship={this.state.ship}/>
         </div>
      );
   }
}