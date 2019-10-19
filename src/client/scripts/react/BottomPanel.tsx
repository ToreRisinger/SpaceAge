import React from "react";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "../modules/GlobalData";

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
      console.log("render");
      let speed = 0;
      if(this.state.ship != undefined) {
         speed = Math.round(this.state.ship.speed);
      }
      return (
         <div id="bottom_panel" className="UIComponent">
            <h1>Speed: {speed}</h1> 
         </div>
      );
   }
}