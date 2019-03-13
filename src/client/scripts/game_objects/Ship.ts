import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";
import { SPRITES } from "../constants/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { DataObjects } from "../../../shared/scripts/DataObjects"
import { SHIP_MODULE_TYPE_ENUM } from "../../../shared/scripts/SHIP_MODULE_TYPE_ENUM";
import { SHIP_MODULE_TYPES } from "../constants/SHIP_MODULES";

export class Ship extends GameObject {

    //@ts-ignore
    private sprite : Phaser.GameObjects.Sprite;
    //@ts-ignore
    private outLineSprite : Phaser.GameObjects.Sprite;
    //@ts-ignore
    private shipModules : Object;

    private ship_config : DataObjects.Ship_Config;

    constructor(ship_config : DataObjects.Ship_Config) {
        super(ship_config);
        this.ship_config = ship_config;

        this.buildShip();
    }

    private buildShip() {
        this.shipModules = SHIP_MODULE_TYPES[SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I];
        this.sprite = GameScene.getInstance().addSprite(this.ship_config.x, this.ship_config.y,  SHIP_MODULE_TYPES[SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I].sprite);
        GameScene.getInstance().playAnimation(this.sprite, SHIP_MODULE_TYPES[SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I].animation.key);
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {this.outLineSprite.setVisible(true) });
        this.sprite.on('pointerout', () => { this.outLineSprite.setVisible(false) });

        this.outLineSprite = GameScene.getInstance().addSprite(this.ship_config.x, this.ship_config.y, SPRITES.MODULE_OUTLINE_RED.key);
        this.outLineSprite.setVisible(false);

        this.sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
        this.outLineSprite.setDepth(DRAW_LAYERS.OTHER_SHIP_OUTLINE_LAYER);
    }

    public updateDataObjectConfig(ship_config : DataObjects.Ship_Config) {
        super.updateDataObjectConfig(ship_config);
        this.ship_config = ship_config;
        this.updateSpritePosition();
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
        this.sprite.destroy();
        this.outLineSprite.destroy();
    }

    public setToThisPlayerShip() {
        this.sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
        this.outLineSprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
    }

    private updateSpritePosition() {
        this.sprite.setPosition(this.ship_config.x, this.ship_config.y);
        this.outLineSprite.setPosition(this.ship_config.x, this.ship_config.y);
    }
}