import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ShipModules } from "../../../shared/scripts/ShipModules"

interface IShipModuleWithSprite { 
    module: ObjectInterfaces.IModule, 
    x : number, 
    y : number, 
    sprite : Phaser.GameObjects.Sprite, 
    outlineSprite : Phaser.GameObjects.Sprite
}

export class ShipSprite {

    //@ts-ignore
    private shipSpriteGroup : Phaser.GameObjects.Group;
    //@ts-ignore
    private shipSpriteOutlineGroup : Phaser.GameObjects.Group;

    private posVec : Phaser.Math.Vector2;

    //@ts-ignore
    private shipModulesWithSprites : Array<IShipModuleWithSprite>;
    private thisPlayerShip : boolean;

    constructor(shipModules :  Array<{ module: ObjectInterfaces.IModule, x : number, y : number }>, posVec : Phaser.Math.Vector2, thisPlayerShip : boolean) {
        this.posVec = posVec;
        this.thisPlayerShip = thisPlayerShip;
        this.buildSprite(shipModules);
    }

    public updateSpritePosition(newPosVec : Phaser.Math.Vector2) {
        function setModulePosition(module : IShipModuleWithSprite, newPosVec : Phaser.Math.Vector2) {
            module.sprite.x = Math.floor(newPosVec.x) + module.x * 38;
            module.sprite.y = Math.floor(newPosVec.y) + module.y * 38;
            module.outlineSprite.x = Math.floor(newPosVec.x) + module.x * 38;
            module.outlineSprite.y = Math.floor(newPosVec.y) + module.y * 38;
        }

        this.shipModulesWithSprites.forEach(module => setModulePosition(module, newPosVec))
    }

    private buildSprite(shipModules :  Array<{ module: ObjectInterfaces.IModule, x : number, y : number }>) {
        this.shipModulesWithSprites = new Array<IShipModuleWithSprite>();
        for(let i = 0; i < shipModules.length; i++) {
            let shipModule = shipModules[i];
            let sprite = GameScene.getInstance().addSprite(this.posVec.x + shipModule.x * 38, this.posVec.x + shipModule.y * 38, ShipModules.getModuleInfo(shipModule.module.module_type).sprite.key);
            let outlineSprite = GameScene.getInstance().addSprite(this.posVec.x + shipModule.x * 38, this.posVec.x + shipModule.y * 38, SPRITES.MODULE_OUTLINE_RED.sprite.key);
            let module = {
                module : shipModule.module,
                x : shipModule.x,
                y : shipModule.y,
                sprite : sprite,
                outlineSprite : outlineSprite
            }
                
            if(ShipModules.getModuleInfo(module.module.module_type).animation != undefined) {
                //@ts-ignore
                GameScene.getInstance().playAnimation(module.sprite, ShipModules.getModuleInfo(module.module.module_type).animation.key);
            }

            module.sprite.setInteractive();
            module.sprite.on('pointerover', () => {
                this.shipModulesWithSprites.forEach(module => {
                    //@ts-ignore
                    module.outlineSprite.setVisible(true) 
                })
            });
            module.sprite.on('pointerout', () =>  {
                this.shipModulesWithSprites.forEach(module => {
                    //@ts-ignore
                    module.outlineSprite.setVisible(false) 
                })
            });
            
            module.outlineSprite.setVisible(false);

            if(this.thisPlayerShip) {
                module.sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
                module.outlineSprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_OUTLINE_LAYER);
            } else {
                module.sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
                module.outlineSprite.setDepth(DRAW_LAYERS.OTHER_SHIP_OUTLINE_LAYER);
            }
            this.shipModulesWithSprites.push(module);
        }
    }

    public destroy() {
        this.shipModulesWithSprites.forEach(module => module.sprite.destroy());
        this.shipModulesWithSprites.forEach(module => module.outlineSprite.destroy());
    }

}