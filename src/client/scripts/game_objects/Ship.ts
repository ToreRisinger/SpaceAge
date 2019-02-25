import { SHIP_MODULES } from "../constants/SHIP_MODULES"
import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";

export class Ship extends GameObject {

    private shipModules : Object;
    private sprite : Phaser.GameObjects.Sprite;
    
    constructor() {
        super();

        this.shipModules = SHIP_MODULES.MAIN_MODULE_I_COMMON;

        let gameScene : GameScene = GameScene.getInstance();
        this.sprite = gameScene.addSprite(this.x, this.y, SHIP_MODULES.MAIN_MODULE_I_COMMON.sprite);
        this.sprite.setInteractive();
        gameScene.playAnimation(this.sprite, SHIP_MODULES.MAIN_MODULE_I_COMMON.animation);
    }

    public setPos(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.updateSpritePosition();
    }

    public setX(x : number) {
        this.x = x;
        this.updateSpritePosition();
    }

    public setY(y : number) {
        this.y = y;
        this.updateSpritePosition();
    }

    private updateSpritePosition() {
        this.sprite.setPosition(this.x, this.y);
    }
}