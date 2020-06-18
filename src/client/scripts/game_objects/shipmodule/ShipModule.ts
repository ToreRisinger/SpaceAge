import { Ship } from "../Ship";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";
import { Graphics } from "../../modules/graphics/Graphics";
import { IShipModuleInstance } from "../../../../shared/data/IShipModuleInstance";

export class ShipModule {

    private static MODULE_SPRITE_SIZE = 38;

    private sprite : Graphics.Sprite;
    private ship: Ship;
    private module: IShipModuleInstance;
    private thisPlayerShip: boolean;

    constructor(ship: Ship, _module: IShipModuleInstance, thisPlayerShip: boolean) {
        this.thisPlayerShip = thisPlayerShip;
        this.ship = ship;
        this.module = _module;
        this.sprite = new Graphics.Sprite( ShipModuleInfo.getModuleInfo(this.module.moduleItem.itemType).sprite, this.getCalculatedModuleX(), this.getCalculatedModuleY());
        this.setupSprite();
    }

    public update() {
        this.updateSpriteLocation();
        this.sprite.update();
    }

    private updateSpriteLocation() {
        this.sprite.setPos(this.getCalculatedModuleX(), this.getCalculatedModuleY());
    }

    protected getCalculatedModuleX() {
        return this.ship.getPos().x + this.module.x * ShipModule.MODULE_SPRITE_SIZE;
    }

    protected getCalculatedModuleY() {
        return this.ship.getPos().y + this.module.y * ShipModule.MODULE_SPRITE_SIZE;
    }

    public setVisible(value : boolean) : void {
        this.sprite.setVisible(value);
    }

    public destroy() {
        this.sprite.destroy();
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

    protected getShip(): Ship {
        return this.ship;
    }

    protected getSprite(): Graphics.Sprite {
        return this.sprite;
    }

}