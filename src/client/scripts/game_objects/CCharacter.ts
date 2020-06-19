import { ICargo } from "../../../shared/data/ICargo";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { CShip } from "./CShip";
import { ICharacterSkills } from "../../../shared/data/skills/ICharacterSkills";

export class CCharacter extends CShip {

    private characterData : ICharacter;
    private shipCargo : ICargo;

    constructor(characterData : ICharacter, thisPlayerShip : boolean) {
        super(characterData, thisPlayerShip);
        this.characterData = characterData;
        this.shipCargo = {
            items : []
        }
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

    public getSectorCoordinates(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.characterData.sectorCoords.x, this.characterData.sectorCoords.x);
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