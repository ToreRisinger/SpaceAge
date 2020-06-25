import React from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { CShip } from "../../../game_objects/CShip";
import ShipStatContainer from "./ShipStatContainer";

export interface ShipStatPanelState { ship : CShip; }

export default class ShipStatPanel extends React.Component<{}, ShipStatPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         ship: GlobalDataService.getInstance().getPlayerShip()
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
         ship: globalData.getPlayerShip()
      });
    }

   render() {
      return (
          <div className="ShipStatPanel">
            <ShipStatContainer ship={this.state.ship}></ShipStatContainer>
          </div>
      );   
   }
}