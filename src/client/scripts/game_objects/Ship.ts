import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";
import { SPRITES } from "../constants/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { DataObjects } from "../../../shared/scripts/DataObjects"
import { SHIP_MODULE_TYPE_ENUM } from "../../../shared/scripts/SHIP_MODULE_TYPE_ENUM";
import { SHIP_MODULE_TYPES } from "../constants/SHIP_MODULES";
import { ShipSprite } from "./ShipSprite";

export class Ship extends GameObject {

    private ship_config : DataObjects.Ship_Config;
    //@ts-ignore
    private shipSprite : ShipSprite;
    private thisPlayerShip : boolean;

    constructor(ship_config : DataObjects.Ship_Config, thisPlayerShip : boolean) {
        super(ship_config);
        this.ship_config = ship_config;
        this.thisPlayerShip = thisPlayerShip;
        this.buildShip();
    }

    private buildShip() {
        this.shipSprite = new ShipSprite(this.ship_config.modules, new Phaser.Math.Vector2(this.ship_config.x, this.ship_config.y), this.thisPlayerShip);
    }

    public updateDataObjectConfig(ship_config : DataObjects.Ship_Config) {
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
}