import React from "react";
import { ICharacter } from "../../../../shared/data/gameobject/ICharacter";

export interface CharacterListProps { characterList : Array<ICharacter>, loading: boolean, selectedIndex: number | undefined, onSelect: (index: number) => void, onCreateNew: () => void }

export default class CharacterList extends React.Component<CharacterListProps, {}> {

    private selection : ICharacter | undefined;

    constructor(props : CharacterListProps) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event: React.MouseEvent<HTMLDivElement>, characterName: string, index: number) {
        this.props.onSelect(index);
    }

    render() {
        return (
            <div className="CharacterListContainer Unselectable BodyText">
                <div className="CharacterList">
                    {this.props.loading ?
                        "Loading"
                        :
                        ""
                    }
                    {this.props.characterList.map((object, i) => 
                        <div className={this.props.selectedIndex == i ? "CharacterContainer CharacterContainerSelected" : "CharacterContainer CharacterContainerNotSelected"} onClick={(e) => this.handleSelect(e, object.name, i)} key={i}>
                            <span>Name: {object.name}</span>
                            <span>Location: {object.location}</span>
                            <span>(x, y): ({Math.floor(object.x)}, {Math.floor(object.y)})</span>
                        </div>
                    )}
                </div>
                <div className="CreateNewCharacterButton" onClick={this.props.onCreateNew}>Create New</div>
            </div>
        );
    }
}
