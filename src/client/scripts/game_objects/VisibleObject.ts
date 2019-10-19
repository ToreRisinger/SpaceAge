import { GameObject } from "./GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GlobalData } from "../modules/GlobalData";


export class VisibleObject extends GameObject {

    private iconSprite : Phaser.GameObjects.Sprite;
    private isHoverOrSelected : boolean;
    private ICON_ALPHA_DEFAULT : number = 0.5;
    private ICON_ALPHA_HOVER : number = 1;
    private hoverStateChange : boolean;

    constructor(game_object_config : ObjectInterfaces.IGameObject) {
        super(game_object_config);
        this.iconSprite = GameScene.getInstance().addSprite(this.getPos().x, this.getPos().y, SPRITES.SHIP_ICON.sprite.key);
        this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        this.iconSprite.setInteractive();
        this.iconSprite.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.isHoverOrSelected = false;
        this.hoverStateChange = false;

        this.iconSprite.on('pointerover', () => {
            this.hoverStateChange = !this.isHoverOrSelected;
            this.isHoverOrSelected = true;
        });
        this.iconSprite.on('pointerout', () =>  {
            this.hoverStateChange = this.isHoverOrSelected;
            this.isHoverOrSelected = false;
        });
    }

    public update() {
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * GlobalData.cameraZoom, SPRITES.SHIP_ICON.sprite.height * GlobalData.cameraZoom);
        this.iconSprite.x = this.getPos().x;
        this.iconSprite.y = this.getPos().y;

        if(this.hoverStateChange) {
            if(this.isHoverOrSelected) {
                this.iconSprite.alpha = this.ICON_ALPHA_HOVER;
            } else {
                this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
            }
        } 
    }

    public destroy() {
        this.iconSprite.destroy();
        super.destroy();   
    }

    public setIsHoverOrSelected(value : boolean) {
        this.isHoverOrSelected = value;
    }

    protected setIconTint(color : number) {
        this.iconSprite.setTint(0x00ff00, 0x00ff00, 0x00ff00, 0x00ff00);
    }

    isDetectedByGravitationalRadar() : boolean {
        throw new TypeError("Cannot construct Abstract instances directly");
    }

    isDetectedByProximityRadar() : boolean {
        throw new TypeError("Cannot construct Abstract instances directly");
    }

    getDistanceToPlayerShip() : number {
        throw new TypeError("Cannot construct Abstract instances directly");
    }
}