import { ICargo } from "../../../shared/data/ICargo";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { CShip } from "./CShip";
import { ICharacterSkills } from "../../../shared/data/skills/ICharacterSkills";
import { SPRITES } from "../../../shared/util/SPRITES";
import { Colors } from "../../../shared/colors/Colors";
import { IItem } from "../../../shared/data/item/IItem";
import { EModuleItemType } from "../../../shared/data/item/EModuleItemType";
import { IManufacturingType } from "../../../shared/data/IManufacturingState";

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

    public isProcessingOre(): boolean {
        return this.characterData.oreProcessingState.isProcessing;
    }

    public getProcessingOreItem(): IItem | undefined {
        return this.characterData.oreProcessingState.item;
    }

    public getProcessingOreStartTime(): number {
        return this.characterData.oreProcessingState.startTime;
    }

    public isManufacturing(): boolean {
        return this.characterData.manufactruingState.isManufacturing;
    }

    public getManufacturingType(): IManufacturingType | undefined {
        return this.characterData.manufactruingState.module;
    }

    protected shouldShowThrustEffect(): boolean {
        return this.getIsMoving() && !this.isWarping();
    }
}