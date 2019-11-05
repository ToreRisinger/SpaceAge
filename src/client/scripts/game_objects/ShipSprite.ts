import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GameScene } from "../scenes/GameScene";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ShipModules } from "../../../shared/scripts/ShipModules"
import { Ship } from "./Ship";

interface IShipModuleWithSprite { 
    module: ObjectInterfaces.IModule, 
    x : number, 
    y : number, 
    sprite : Phaser.GameObjects.Sprite
}

export class ShipSprite {

    private posVec : Phaser.Math.Vector2;

    //@ts-ignore
    private shipModulesWithSprites : Array<IShipModuleWithSprite>;
    private thisPlayerShip : boolean;
    private thisShip : Ship;

    constructor(shipModules :  Array<{ module: ObjectInterfaces.IModule, x : number, y : number }>, posVec : Phaser.Math.Vector2, thisPlayerShip : boolean, ship: Ship) {
        this.posVec = posVec;
        this.thisPlayerShip = thisPlayerShip;
        this.thisShip = ship;
        this.buildSprite(shipModules);
    }

    public updateSpritePosition(newPosVec : Phaser.Math.Vector2) {
        function setModulePosition(module : IShipModuleWithSprite, newPosVec : Phaser.Math.Vector2) {
            module.sprite.x = Math.floor(newPosVec.x) + module.x * 38;
            module.sprite.y = Math.floor(newPosVec.y) + module.y * 38;
        }

        this.shipModulesWithSprites.forEach(module => setModulePosition(module, newPosVec))
    }

    public destroy() {
        this.shipModulesWithSprites.forEach(module => module.sprite.destroy());
    }

    public setVisible(value : boolean) : void {
        this.shipModulesWithSprites.forEach(module => module.sprite.setVisible(value));
    }

    private buildSprite(shipModules :  Array<{ module: ObjectInterfaces.IModule, x : number, y : number }>) {
        this.shipModulesWithSprites = new Array<IShipModuleWithSprite>();
        for(let i = 0; i < shipModules.length; i++) {
            let shipModule = shipModules[i];
            let sprite = GameScene.getInstance().addSprite(this.posVec.x + shipModule.x * 38, this.posVec.x + shipModule.y * 38, ShipModules.getModuleInfo(shipModule.module.module_type).sprite.key);
            let module = {
                module : shipModule.module,
                x : shipModule.x,
                y : shipModule.y,
                sprite : sprite
            }
            
            module.sprite.setInteractive();
            module.sprite.on('pointerover', () => {
                this.thisShip.setIsHover(true);
            });
            module.sprite.on('pointerout', () =>  {
                this.thisShip.setIsHover(false);
            });
            module.sprite.on('pointerdown', () => {
                this.thisShip.select();
            });
            
            if(this.thisPlayerShip) {
                module.sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
            } else {
                module.sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
            }
            this.shipModulesWithSprites.push(module);
        }
    }
}