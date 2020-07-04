import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import ShipStatContainer from "./ShipStatContainer";
import MoneyContainer from "../cargo/MoneyContainer";
import { CCharacter } from "../../../game_objects/CCharacter";
import WarpingNotificationContainer from "./WarpingNotificationContainer";

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
            <MoneyContainer character={this.state.character}/>
            <WarpingNotificationContainer isWarping={this.state.character.isWarping()}></WarpingNotificationContainer>
            <div className="ShipStatPanel">
               <ShipStatContainer ship={this.state.character}></ShipStatContainer>
            </div>
         </Fragment>
        
      );   
   }
}