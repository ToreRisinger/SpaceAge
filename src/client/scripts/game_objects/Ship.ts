import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";
import { RadarDetectable } from "./RadarDetectable";

export class Ship extends RadarDetectable {

    private ship_config : ObjectInterfaces.IShip;
    //@ts-ignore
    private shipSprite : ShipSprite;

    constructor(ship_config : ObjectInterfaces.IShip, thisPlayerShip : boolean) {
        super(ship_config, thisPlayerShip);
        this.ship_config = ship_config;

        this.buildShip();
        if(thisPlayerShip) {
            this.setIconBaseColor(0x00ff00);
        }
    }

    public updateDataObjectConfig(ship_config : ObjectInterfaces.IShip) {
        super.updateDataObjectConfig(ship_config);
        this.ship_config = ship_config;
    }

    public update() {
        this.shipSprite.updateSpritePosition(this.getPos());
        super.update();
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

    public getShipData() :  ObjectInterfaces.IShip {
        return this.ship_config;
    }

    private buildShip() {
        this.shipSprite = new ShipSprite(this.ship_config.modules, this.getPos(), this.isThisPlayerShip(), this);
    }

    protected getRadarMass() : number {
        return this.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.mass] * ( 1 - this.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        this.shipSprite.setVisible(value);
    }
}