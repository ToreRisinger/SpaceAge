import React from "react";
import { ICharacter } from "../../../../../shared/interfaces/ICharacter";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../../modules/EventHandler";

export interface CharacterSelectionContainerProps { characterList : Array<ICharacter>; }
export interface CharacterSelectionContainerState { character : ICharacter | undefined }

export default class CharacterSelectionContainer extends React.Component<CharacterSelectionContainerProps, CharacterSelectionContainerState> {

    private selection : ICharacter | undefined;

    constructor(props : CharacterSelectionContainerProps) {
        super(props);
        this.state = {
            character : undefined
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleJoin(event: React.MouseEvent<HTMLButtonElement>) {
        if(this.state.character != undefined) {
            let event : Events.CLIENT_JOIN_REQ = {
                eventId : Events.EEventType.CLIENT_JOIN_REQ,
                data : {
                    character: this.state.character
                }
            }
            
            EventHandler.pushEvent(event);
        }
    }

    handleSelect(event: React.MouseEvent<HTMLDivElement>, characterName: string) {
        for(let i = 0; i < this.props.characterList.length; i++) {
            if(this.props.characterList[i].name == characterName) {
                this.setState({
                    character : this.props.characterList[i]
                });
            }
        }
    }

    render() {
        const button_id = this.state.character == undefined ? "join_server_button_disabled" : "join_server_button"
        return (
           <div id="character_selection_container">
               <div id="character_list_container">
                    {this.props.characterList.map((object, i) => 
                        <div id="character_container" onClick={(e) => this.handleSelect(e, object.name)} className="Unselectable" key={i}>
                            {object.name}
                        </div>
                    )}
                </div>
                <button id={button_id} type="submit" onClick={this.handleJoin}>Join</button>
           </div>
        );
    }
}