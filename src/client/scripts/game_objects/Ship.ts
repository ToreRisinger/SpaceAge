import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";
import { GlobalData } from "../modules/GlobalData";
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
            this.setIconTint(0x00ff00);
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
        return new Phaser.Math.Vector2(Math.floor(this.ship_config.destinationX), Math.floor(this.ship_config.destinationY));
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
}