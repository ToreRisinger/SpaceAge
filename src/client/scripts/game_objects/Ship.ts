import { SHIP_MODULES } from "../constants/SHIP_MODULES"
import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";

export class Ship extends GameObject {

    private isMoving : boolean = false;
    private destinationPosVec : Phaser.Math.Vector2;
    private shipModules : Object;
    //@ts-ignore
    private sprite : Phaser.GameObjects.Sprite;
    private destinationLine : Phaser.GameObjects.Line | undefined;
    

    constructor() {
        super();

        this.destinationPosVec = new Phaser.Math.Vector2(this.posVec.x, this.posVec.y);
        this.shipModules = SHIP_MODULES.MAIN_MODULE_I_COMMON;
        this.createSprite();
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

    public setShipDepth(value : number) {
        this.sprite.setDepth(value);
    }
    private createSprite() {
        this.sprite = GameScene.getInstance().addSprite(this.posVec.x, this.posVec.y, SHIP_MODULES.MAIN_MODULE_I_COMMON.sprite);
        GameScene.getInstance().playAnimation(this.sprite, SHIP_MODULES.MAIN_MODULE_I_COMMON.animation);
        this.sprite.setInteractive();
    }

    private updateSpritePosition() {
        this.sprite.setPosition(this.posVec.x, this.posVec.y);
    }
}