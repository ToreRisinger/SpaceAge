import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import ShipStatContainer from "./ShipStatContainer";
import { CCharacter } from "../../../game_objects/CCharacter";
import WarpingNotificationContainer from "./WarpingNotificationContainer";
import DockingNotificationContainer from "./DockingNotificationContainer";

export interface ShipStatPanelState { character : CCharacter; }

export default class ShipStatPanel extends React.Component<{}, ShipStatPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         character: GlobalDataService.getInstance().getPlayerShip()
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
         character: globalData.getPlayerShip()
      });
    }

   render() {
      return (
         <Fragment>
            <WarpingNotificationContainer isWarping={this.state.character.isWarping()}></WarpingNotificationContainer>
            <DockingNotificationContainer isDocking={this.state.character.isDocking()}></DockingNotificationContainer>
            <div className="ShipStatPanel">
               <ShipStatContainer ship={this.state.character}></ShipStatContainer>
            </div>
         </Fragment>
        
      );   
   }
}