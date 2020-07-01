import { ICargo } from "../../../shared/data/ICargo";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { CShip } from "./CShip";
import { ICharacterSkills } from "../../../shared/data/skills/ICharacterSkills";
import { SPRITES } from "../../../shared/util/SPRITES";

export class CCharacter extends CShip {

    private characterData : ICharacter;
    private shipCargo : ICargo;

    constructor(characterData : ICharacter, thisPlayerShip : boolean) {
        super(characterData, SPRITES.SHIP_ICON.sprite, thisPlayerShip);
        this.characterData = characterData;
        this.shipCargo = {
            items : []
        }
    }

    public getMoney(): number {
        return this.characterData.money;
    }
    
    public setCargo(cargo : ICargo) {
        this.shipCargo = cargo;
    }

    public getCargo() : ICargo {
        return this.shipCargo;
    }

    public getLocation(): string {
        return this.characterData.location;
    }

    public getSectorId(): number {
        return this.characterData.sectorId;
    }

    public getSkills(): ICharacterSkills {
        return this.characterData.skills;
    }

    public updateData(characterData : ICharacter) {
        super.updateData(characterData);
        this.characterData = characterData;
    }

    public isWarping(): boolean {
        return this.characterData.warpState.isWarping;
    }
}