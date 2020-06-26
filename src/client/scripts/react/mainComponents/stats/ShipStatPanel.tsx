import React, { Fragment } from "react";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { CShip } from "../../../game_objects/CShip";
import ShipStatContainer from "./ShipStatContainer";
import MoneyContainer from "../cargo/MoneyContainer";
import { CCharacter } from "../../../game_objects/CCharacter";

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
            <div className="ShipStatPanel">
               <ShipStatContainer ship={this.state.character}></ShipStatContainer>
            </div>
         </Fragment>
        
      );   
   }
}