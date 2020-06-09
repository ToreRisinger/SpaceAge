import { Ship } from "./Ship";
import { Items } from "../../../shared/scripts/Items";
import { GameScene } from "../scenes/GameScene";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { ShipModules } from "../../../shared/scripts/ShipModules";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";

export class ShipModule {

    private static MODULE_SPRITE_SIZE = 38;

    private sprite : Phaser.GameObjects.Sprite;
    private ship: Ship;
    private module: ObjectInterfaces.IShipModuleInstance;
    private thisPlayerShip: boolean;

    constructor(ship: Ship, _module: ObjectInterfaces.IShipModuleInstance, thisPlayerShip: boolean) {
        this.thisPlayerShip = thisPlayerShip;
        this.ship = ship;
        this.module = _module;
        this.sprite = GameScene.getInstance().addSprite(this.getCalculatedModuleX(), this.getCalculatedModuleY(), ShipModules.getModuleInfo(this.module.moduleItem.itemType).sprite.key);
        this.setupSprite();
    }

    public update() {
        this.updateSpriteLocation();
    }

    private updateSpriteLocation() {
        this.sprite.x = this.getCalculatedModuleX();
        this.sprite.y = this.getCalculatedModuleY();
    }

    private getCalculatedModuleX() {
        return this.ship.getPos().x + this.module.x * ShipModule.MODULE_SPRITE_SIZE;
    }

    public setVisible(value : boolean) : void {
        this.sprite.setVisible(value);
    }

    public destroy() {
        this.sprite.destroy();
    }

    private getCalculatedModuleY() {
        return this.ship.getPos().y + this.module.y * ShipModule.MODULE_SPRITE_SIZE;
    }

    private setupSprite() {
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {
            this.ship.setIsHover(true);
        });
        this.sprite.on('pointerout', () =>  {
            this.ship.setIsHover(false);
        });
        this.sprite.on('pointerdown', () => {
            this.ship.select();
        });
        
        if(this.thisPlayerShip) {
            this.sprite.setDepth(DRAW_LAYERS.THIS_PLAYER_SHIP_LAYER);
        } else {
            this.sprite.setDepth(DRAW_LAYERS.OTHER_SHIP_LAYER);
        }
    }
}