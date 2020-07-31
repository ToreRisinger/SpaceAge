import React, { Fragment } from "react";
import { ICharacter } from "../../../../shared/data/gameobject/ICharacter";
import CharacterList from "./CharacterList";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import CharacterSelection from "./CharacterSelection";
import { Utils } from "../../../../shared/util/Utils";

export interface CharacterSelectionPageState {characters: Array<ICharacter>, selectedIndex: number | undefined, loading: boolean}

export default class CharacterSelectionPage extends React.Component<{}, CharacterSelectionPageState> {

   constructor(props : {}) {
      super(props)
      this.state = {
         characters: new Array(),
         selectedIndex: undefined,
         loading: true
      }
      this.onCharacterListFailed = this.onCharacterListFailed.bind(this);
      this.onCharacterListReceived = this.onCharacterListReceived.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.onCreateNew = this.onCreateNew.bind(this);
      this.onCreateNewFail = this.onCreateNewFail.bind(this);
      this.requestCharacterList = this.requestCharacterList.bind(this);
      this.onJoin = this.onJoin.bind(this);
      EventHandler.on(Events.EEventType.SERVER_CHARACTER_LIST_ACK, this.onCharacterListReceived);
      EventHandler.on(Events.EEventType.SERVER_CHARACTER_LIST_FAIL, this.onCharacterListFailed);
      EventHandler.on(Events.EEventType.SERVER_NEW_CHARACTER_FAIL, this.onCreateNewFail);
      this.requestCharacterList();
   }

   componentWillUpdate() {
      if(this.state.loading) {
         this.requestCharacterList();
      }
   }

   requestCharacterList() {
      let event: Events.CLIENT_CHARACTER_LIST_REQ = {
         eventId: Events.EEventType.CLIENT_CHARACTER_LIST_REQ, 
         data: {}
      }
      EventHandler.pushEvent(event);
   }

   onCharacterListReceived(event: Events.SERVER_CHARACTER_LIST_ACK) {
      this.setState({
         characters: event.data.characters,
         loading: false
      })
   }

   onCharacterListFailed(event: Events.SERVER_CHARACTER_LIST_FAIL) {
      this.setState({
         loading: false
      })
   }

   onSelect(index: number): void {
      this.setState({
         selectedIndex: index
      })
   }

   onCreateNew() {
      let event: Events.CLIENT_NEW_CHARACTER_REQ = {
         eventId: Events.EEventType.CLIENT_NEW_CHARACTER_REQ,
         data: {
            characterName: Utils.getRandomNumber(0, 1000000) + ""
         }
      }
      EventHandler.pushEvent(event);
      this.setState({
         loading: true,
         characters: new Array(),
         selectedIndex: undefined
      })
   }

   onCreateNewFail() {

   }

   onJoin() {
      let event: Events.CLIENT_JOIN_REQ = {
         eventId: Events.EEventType.CLIENT_JOIN_REQ,
         data: {
            //@ts-ignore
            character: this.state.characters[this.state.selectedIndex] 
         }
      }
      EventHandler.pushEvent(event);
   }

   render() {
      return (
         <div className="CharacterSelectionPage">
            <CharacterList characterList={this.state.characters} loading={this.state.loading} selectedIndex={this.state.selectedIndex} onSelect={this.onSelect} onCreateNew={this.onCreateNew}/>
            {this.state.selectedIndex != undefined ?
               <Fragment>
                  <CharacterSelection selection={this.state.characters[this.state.selectedIndex]} onJoin={this.onJoin}/>
               </Fragment>
               :
               ""
            }
            
         </div>
      );
   }
}