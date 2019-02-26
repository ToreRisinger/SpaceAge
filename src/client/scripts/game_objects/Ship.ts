import { SHIP_MODULES } from "../constants/SHIP_MODULES"
import { GameScene } from "../scenes/GameScene"
import { GameObject } from "./GameObject";

export class Ship extends GameObject {

    private isMoving : boolean = false;
    private destinationPosVec : Phaser.Math.Vector2;
    private shipModules : Object;
    private sprite : Phaser.GameObjects.Sprite;
    private destinationLine : Phaser.GameObjects.Line | undefined;
    
    constructor() {
        super();

        this.destinationPosVec = new Phaser.Math.Vector2(this.posVec.x, this.posVec.y);
        this.shipModules = SHIP_MODULES.MAIN_MODULE_I_COMMON;
        this.sprite = GameScene.getInstance().addSprite(this.posVec.x, this.posVec.y, SHIP_MODULES.MAIN_MODULE_I_COMMON.sprite);
        GameScene.getInstance().playAnimation(this.sprite, SHIP_MODULES.MAIN_MODULE_I_COMMON.animation);
        this.sprite.setInteractive();
    }

    public setPos(posVec : Phaser.Math.Vector2) {
        this.posVec = posVec;
        this.updateSpritePosition();
    }

    public setDestinationPos(destinationPosVec : Phaser.Math.Vector2) {
        //if this is a new destination
        if(this.destinationPosVec.x != destinationPosVec.x || this.destinationPosVec.y != destinationPosVec.y) {
            this.destinationPosVec = destinationPosVec;

            //Remove old line if we had one
            if(this.destinationLine != undefined) {
                this.destinationLine.destroy();
                this.destinationLine = undefined;
            }

            //Create new line
            this.destinationLine = GameScene.getInstance().add.line(
                0,
                0,
                this.posVec.x,
                this.posVec.y,
                this.destinationPosVec.x,
                this.destinationPosVec.y,
                0x8D979A,
                undefined
            ).setOrigin(0, 0);
            //TODO, try geometry to draw line?, this is to think.
            this.destinationLine.setZ(10);
            this.destinationLine.setStrokeStyle(0.5, 0x8D979A, undefined );
        }
    }

    public setIsMoving(newIsMoving : boolean) {
        this.isMoving = newIsMoving;
    }

    public update() {
        //We are not moving
        if(this.isMoving) {
            if(this.destinationLine != undefined) {
                console.log
                this.destinationLine.setTo(this.posVec.x,
                    this.posVec.y,
                    this.destinationPosVec.x,
                    this.destinationPosVec.y);
            }
        }
        if(!this.isMoving) {
            if(this.destinationLine != undefined) {
                this.destinationLine.destroy();
                this.destinationLine = undefined;
            }
        }
    }

    private updateSpritePosition() {
        this.sprite.setPosition(this.posVec.x, this.posVec.y);
    }

    
}