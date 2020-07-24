import { ICargo } from "../../../shared/data/ICargo";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { CShip } from "./CShip";
import { ICharacterSkills } from "../../../shared/data/skills/ICharacterSkills";
import { SPRITES } from "../../../shared/util/SPRITES";
import { Colors } from "../../../shared/colors/Colors";

export class CCharacter extends CShip {

    private characterData : ICharacter;
    private shipCargo : ICargo;

    constructor(characterData : ICharacter, thisPlayerShip : boolean) {
        super(characterData, SPRITES.SHIP_ICON.sprite, thisPlayerShip);
        this.characterData = characterData;
        this.shipCargo = {
            items : []
        }

        if(thisPlayerShip) {
            this.setIconBaseColor(Colors.HEX.GREEN);
        } else {
            this.setIconBaseColor(0x596fff);
        }
    }

    public updateData(characterData : ICharacter) {
        super.updateData(characterData);
        this.characterData = characterData;
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

    public isWarping(): boolean {
        return this.characterData.warpState.isWarping;
    }

    public isDocking(): boolean {
        return this.characterData.dockingState.isDocking;
    }

    protected shouldShowThrustEffect(): boolean {
        return this.getIsMoving() && !this.isWarping();
    }
}