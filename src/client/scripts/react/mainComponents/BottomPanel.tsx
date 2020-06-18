import React from "react";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { Ship } from "../../game_objects/Ship";

export interface BottomPanelState { ship : Ship; }

export default class BottomPanel extends React.Component<{}, BottomPanelState> {

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
         <div id="bottom_panel" className="PanelBackground Unselectable HasBorder">
            <ShipStatsBottomPanel ship={this.state.ship}/>
         </div>
      );
   }
}