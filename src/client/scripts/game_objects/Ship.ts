import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";
import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { ICargo } from "../../../shared/interfaces/ICargo";
import { Stats } from "../../../shared/stats/Stats";
import { ICharacter } from "../../../shared/interfaces/ICharacter";

export class Ship extends RadarDetectable {

    private characterData : ICharacter;
    //@ts-ignore
    private shipSprite : ShipSprite;
    private shipCargo : ICargo;
    private characterName : string;

    constructor(characterData : ICharacter, thisPlayerShip : boolean, characterName: string) {
        super(characterData, SPRITES.SHIP_ICON.sprite, thisPlayerShip, false);
        this.characterData = characterData;
        this.characterName = characterName;
        this.shipCargo = {
            items : []
        }

        this.buildShip();
        if(thisPlayerShip) {
            this.setIconBaseColor(0x00ff00);
        }
    }

    public setCargo(cargo : ICargo) {
        this.shipCargo = cargo;
    }

    public getCargo() : ICargo {
        return this.shipCargo;
    }

    public updateDataObjectConfig(characterData : ICharacter) {
        super.updateDataObjectConfig(characterData);
        this.characterData = characterData;
    }

    public update() {
        this.shipSprite.updateSpritePosition(this.getPos());
        super.update();
    }

    public getIsMoving() {
        return this.characterData.state.isMoving;
    }

    public getDestinationPos() {
        return new Phaser.Math.Vector2(Math.floor(this.characterData.state.destVec[0]), Math.floor(this.characterData.state.destVec[1]));
    }

    public destroy() {
        this.shipSprite.destroy();
        super.destroy();
    }

    public getData() : ICharacter {
        return this.characterData;
    }

    public getDisplayName() : string {
        return this.characterName;
    }

    private buildShip() {
        this.shipSprite = new ShipSprite(this.characterData.modules, this.getPos(), this.isThisPlayerShip(), this);
    }

    protected getRadarMass() : number {
        return this.characterData.stats[Stats.EStatType.mass] * ( 1 - this.characterData.stats[Stats.EStatType.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        this.shipSprite.setVisible(value);
    }
}