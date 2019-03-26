import { GameObject } from "./GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";

export class Ship extends GameObject {

    private ship_config : ObjectInterfaces.IShip;
    //@ts-ignore
    private shipSprite : ShipSprite;
    private thisPlayerShip : boolean;

    constructor(ship_config : ObjectInterfaces.IShip, thisPlayerShip : boolean) {
        super(ship_config);
        this.ship_config = ship_config;
        this.thisPlayerShip = thisPlayerShip;
        this.buildShip();
    }

    private buildShip() {
        this.shipSprite = new ShipSprite(this.ship_config.modules, new Phaser.Math.Vector2(this.ship_config.x, this.ship_config.y), this.thisPlayerShip);
    }

    public updateDataObjectConfig(ship_config : ObjectInterfaces.IShip) {
        super.updateDataObjectConfig(ship_config);
        this.ship_config = ship_config;
        this.shipSprite.updateSpritePosition(new Phaser.Math.Vector2(this.ship_config.x, this.ship_config.y));
    }

    public update() {
        
    }

    public getIsMoving() {
        return this.ship_config.isMoving;
    }

    public getDestinationPos() {
        return new Phaser.Math.Vector2(this.ship_config.destinationX, this.ship_config.destinationY);
    }

    public destroy() {
        this.shipSprite.destroy();
    }

    public getShipData() :  ObjectInterfaces.IShip {
        return this.ship_config;
    }
}