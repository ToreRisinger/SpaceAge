import React from "react";
import { CCharacter } from "../../../game_objects/CCharacter";

export interface MoneyContainerProps { character: CCharacter } 

export default class MoneyContainer extends React.Component<MoneyContainerProps, {}> {

   constructor(props : MoneyContainerProps) {
      super(props)
   }

   render() {
        return (
            <div className="MoneyContainer Unselectable BodyText">
               <img className="MoneyImage" src={"assets/sprite/icons/money_image.png"}/>
               <div className="MoneyTextContainer">
                  {this.props.character.getMoney()}
               </div>
            </div> 
        );
   }
}