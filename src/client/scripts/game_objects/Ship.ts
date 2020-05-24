import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";
import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";

export class Ship extends RadarDetectable {

    private ship_config : ObjectInterfaces.IShip;
    //@ts-ignore
    private shipSprite : ShipSprite;

    private shipCargo : ObjectInterfaces.ICargo;

    constructor(ship_config : ObjectInterfaces.IShip, thisPlayerShip : boolean) {
        super(ship_config, SPRITES.SHIP_ICON.sprite, thisPlayerShip, false);
        this.ship_config = ship_config;
        this.shipCargo = {
            items : []
        }

        this.buildShip();
        if(thisPlayerShip) {
            this.setIconBaseColor(0x00ff00);
        }
    }

    public setCargo(cargo : ObjectInterfaces.ICargo) {
        this.shipCargo = cargo;
    }

    public getCargo() : ObjectInterfaces.ICargo {
        return this.shipCargo;
    }

    public updateDataObjectConfig(ship_config : ObjectInterfaces.IShip) {
        super.updateDataObjectConfig(ship_config);
        this.ship_config = ship_config;
    }

    public update() {
        this.shipSprite.updateSpritePosition(this.getPos());
        super.update();

        if(this.isThisPlayerShip()) {
        }
    }

    public getIsMoving() {
        return this.ship_config.isMoving;
    }

    public getDestinationPos() {
        return new Phaser.Math.Vector2(Math.floor(this.ship_config.destVec[0]), Math.floor(this.ship_config.destVec[1]));
    }

    public destroy() {
        this.shipSprite.destroy();
        super.destroy();
    }

    public getShipData() : ObjectInterfaces.IShip {
        return this.ship_config;
    }

    public getDisplayName() : string {
        return "" + this.ship_config.id;
    }

    private buildShip() {
        this.shipSprite = new ShipSprite(this.ship_config.modules, this.getPos(), this.isThisPlayerShip(), this);
    }

    protected getRadarMass() : number {
        return this.getShipData().stats[ObjectInterfaces.EShipStatType.mass] * ( 1 - this.getShipData().stats[ObjectInterfaces.EShipStatType.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        this.shipSprite.setVisible(value);
    }
}