import { SHIP_MODULES } from "../constants/SHIP_MODULES"
import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";
import { SPRITES } from "../constants/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";

export class Ship extends GameObject {

    private isMoving : boolean = false;
    private destinationPosVec : Phaser.Math.Vector2;
    private sprite : Phaser.GameObjects.Sprite;
    private outLineSprite : Phaser.GameObjects.Sprite;

    private shipModules : Object;

    constructor() {
        super();

        this.destinationPosVec = new Phaser.Math.Vector2(this.posVec.x, this.posVec.y);

        this.shipModules = SHIP_MODULES.MAIN_MODULE_I_COMMON;
        this.sprite = GameScene.getInstance().addSprite(this.posVec.x, this.posVec.y, SHIP_MODULES.MAIN_MODULE_I_COMMON.sprite);
        GameScene.getInstance().playAnimation(this.sprite, SHIP_MODULES.MAIN_MODULE_I_COMMON.animation);
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {this.outLineSprite.setVisible(true) });
        this.sprite.on('pointerout', () => { this.outLineSprite.setVisible(false) });

        this.outLineSprite = GameScene.getInstance().addSprite(this.posVec.x, this.posVec.y, SPRITES.MODULE_OUTLINE_RED.key);
        this.outLineSprite.setVisible(false);

        this.sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
        this.outLineSprite.setDepth(DRAW_LAYERS.OTHER_SHIP_OUTLINE_LAYER);
    }

    public update() {
        
    }

    public setPos(posVec : Phaser.Math.Vector2) {
        this.posVec = posVec;
        this.updateSpritePosition();
    }

    public setDestinationPos(destinationPosVec : Phaser.Math.Vector2) {
        this.destinationPosVec = destinationPosVec;  
    }

    public getDestinationPos() {
        return this.destinationPosVec;
    }

    public setIsMoving(newIsMoving : boolean) {
        this.isMoving = newIsMoving;
    }

    public getIsMoving() {
        return this.isMoving;
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
        this.sprite.setPosition(this.posVec.x, this.posVec.y);
        this.outLineSprite.setPosition(this.posVec.x, this.posVec.y);
    }
}