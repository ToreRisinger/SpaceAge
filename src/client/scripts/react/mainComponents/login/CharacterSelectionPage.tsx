import React from "react";
import { CharacterListProvider } from "../../../modules/CharacterListProvider";
import { ICharacter } from "../../../../../shared/interfaces/ICharacter";
import CharacterSelectionContainer from "./CharacterSelectionContainer";

export default class CharacterSelectionPage extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
      let characterList : Array<ICharacter> = CharacterListProvider.getInstance().getCharacterList();
      return (
         <div id="character_selection_page">
            <CharacterSelectionContainer characterList={characterList}/>
         </div>
      );
   }
}