import React from "react";
import { ICharacter } from "../../../../../shared/data/gameobject/ICharacter";

export interface CharacterSelectionProps { selection: ICharacter, onJoin: () => void }

export default class CharacterSelection extends React.Component<CharacterSelectionProps, {}> {

   constructor(props : CharacterSelectionProps) {
      super(props)
   }

   render() {
      let object = this.props.selection;
      return (
         <div className="CharacterSelectionContainer BodyText Unselectable">
            <div className="CharacterSelection">
               <span>Name: {object.name}</span>
               <span>Location: {object.location}</span>
               <span>(x, y): ({Math.floor(object.x)}, {Math.floor(object.y)})</span>
            </div>
            <div className="JoinGameButton" onClick={this.props.onJoin}>Enter Game</div>
         </div>
         
      );
   }
}