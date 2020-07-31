import React from "react";
import { CCharacter } from "../../game_objects/CCharacter";
import { GlobalDataService } from "../../modules/GlobalDataService";

export interface MoneyContainerState { character: CCharacter } 

export default class MoneyContainer extends React.Component<{}, MoneyContainerState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         character: GlobalDataService.getInstance().getPlayerShip()
      }
   }

   componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
   }
  
   componentWillUnmount() {
      if(this.timerID != undefined) {
         clearInterval(this.timerID);
      }
   }
  
   tick() {
      this.setState({
         character: GlobalDataService.getInstance().getPlayerShip()
      });
   }

   render() {
        return (
            <div className="MoneyContainer Unselectable BodyText">
               <img className="MoneyImage" src={"assets/sprite/icons/money_image.png"}/>
               <div className="MoneyTextContainer">
                  {this.state.character.getMoney()}
               </div>
            </div> 
        );
   }
}