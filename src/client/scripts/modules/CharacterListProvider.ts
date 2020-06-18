import { ICharacter } from "../../../shared/data/gameobject/ICharacter";

export class CharacterListProvider {

    private static _instance : CharacterListProvider;
    private characterList : Array<ICharacter>;

    constructor(characterList :  Array<ICharacter>) {
        this.characterList = characterList;
    }

    static createInstance(characterList :  Array<ICharacter>) {
        CharacterListProvider._instance = new CharacterListProvider(characterList);
    }

    static getInstance() : CharacterListProvider {
        return CharacterListProvider._instance;
    }

    public getCharacterList() : Array<ICharacter> {
        return this.characterList;
    }
}