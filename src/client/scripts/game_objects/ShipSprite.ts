import { DataObjects } from "../../../shared/scripts/DataObjects";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ShipModules } from "../../../shared/scripts/ShipModules"

export class ShipSprite {

    //@ts-ignore
    private shipSpriteGroup : Phaser.GameObjects.Group;
    //@ts-ignore
    private shipSpriteOutlineGroup : Phaser.GameObjects.Group;

    private posVec : Phaser.Math.Vector2;
    private shipModules : Array<{ module: DataObjects.IModule, x : number, y : number }>;
    private thisPlayerShip : boolean;

    constructor(shipModules :  Array<{ module: DataObjects.IModule, x : number, y : number }>, posVec : Phaser.Math.Vector2, thisPlayerShip : boolean) {
        this.shipModules = shipModules;
        this.posVec = posVec;
        this.thisPlayerShip = thisPlayerShip;
        this.buildSprite();
    }

    public updateSpritePosition(newPosVec : Phaser.Math.Vector2) {
        let oldPos = this.posVec;
        //@ts-ignore
        Phaser.Actions.Call(this.shipSpriteGroup.getChildren(), function(sprite : Phaser.GameObjects.Sprite) {
            sprite.setPosition(newPosVec.x + sprite.x - oldPos.x, newPosVec.y + sprite.y - oldPos.y);
          }, this);
        //@ts-ignore
        Phaser.Actions.Call(this.shipSpriteOutlineGroup.getChildren(), function(sprite : Phaser.GameObjects.Sprite) {
            sprite.setPosition(newPosVec.x + sprite.x - oldPos.x, newPosVec.y + sprite.y - oldPos.y);
          }, this);

        this.posVec = newPosVec;
    }

    private buildSprite() {
        this.shipSpriteGroup = GameScene.getInstance().add.group();
        this.shipSpriteOutlineGroup = GameScene.getInstance().add.group();
        for(let i = 0; i < this.shipModules.length; i++) {
            let module = this.shipModules[i];
            let module_sprite = GameScene.getInstance().addSprite(this.posVec.x + module.x * 38, this.posVec.x + module.y * 38, ShipModules.getModuleInfo(module.module.module_type).sprite.key);
            let module_outline_sprite = GameScene.getInstance().addSprite(this.posVec.x + module.x * 38, this.posVec.x + module.y * 38, SPRITES.MODULE_OUTLINE_RED.sprite.key);
            if(ShipModules.getModuleInfo(module.module.module_type).animation != undefined) {
                //@ts-ignore
                GameScene.getInstance().playAnimation(module_sprite, ShipModules.getModuleInfo(module.module.module_type).animation.key);
            }

            module_sprite.setInteractive();
            module_sprite.on('pointerover', () => {
                this.shipSpriteOutlineGroup.getChildren().forEach(sprite => {
                    //@ts-ignore
                    sprite.setVisible(true) 
                })
            });
            module_sprite.on('pointerout', () =>  {
                this.shipSpriteOutlineGroup.getChildren().forEach(sprite => {
                    //@ts-ignore
                    sprite.setVisible(false) 
                })
            });
            
            module_outline_sprite.setVisible(false);

            if(this.thisPlayerShip) {
                module_sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
                module_outline_sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_OUTLINE_LAYER);
            } else {
                module_sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
                module_outline_sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_OUTLINE_LAYER);
            }

            this.shipSpriteGroup.add(module_sprite);
            this.shipSpriteOutlineGroup.add(module_outline_sprite);
        }
    }

    public destroy() {
        this.shipSpriteGroup.destroy();
        this.shipSpriteOutlineGroup.destroy();
    }

}