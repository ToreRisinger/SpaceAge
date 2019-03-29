import { GameObject } from "./GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GlobalData } from "../modules/GlobalData";


export class VisibleObject extends GameObject {

    private iconSprite : Phaser.GameObjects.Sprite;
    private isHoverOrSelected : boolean;

    constructor(game_object_config : ObjectInterfaces.IGameObject) {
        super(game_object_config);
        this.iconSprite = GameScene.getInstance().addSprite(this.getPos().x, this.getPos().y, SPRITES.SHIP_ICON.sprite.key);
        this.iconSprite.alpha = 0.2;
        this.iconSprite.setInteractive();
        this.iconSprite.on('pointerover', () => {
            this.isHoverOrSelected = true;
        });
        this.iconSprite.on('pointerout', () =>  {
            this.isHoverOrSelected = false;
        });

        this.iconSprite.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);

        this.isHoverOrSelected = false;
    }

    public update() {
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * GlobalData.cameraZoom, SPRITES.SHIP_ICON.sprite.height * GlobalData.cameraZoom);
        this.iconSprite.x = this.getPos().x;
        this.iconSprite.y = this.getPos().y;

        if(this.isHoverOrSelected) {
            this.iconSprite.alpha = 1;
        } else {
            this.iconSprite.alpha = 0.2;
        }
    }

    public destroy() {
        this.iconSprite.destroy();
        super.destroy();   
    }

    public setIsHoverOrSelected(value : boolean) {
        this.isHoverOrSelected = value;
    }
}