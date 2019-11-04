import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "../modules/GlobalData";
import { Events } from "../../../shared/scripts/Events";
import { EventHandler } from "../modules/EventHandler";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GameObject } from "./GameObject";

export class RadarDetectable extends GameObject {

    private iconSprite : Phaser.GameObjects.Sprite;
    private isHoverVar : boolean;
    private ICON_ALPHA_DEFAULT : number = 0.5;
    private ICON_ALPHA_HOVER : number = 1;
    private hoverStateChange : boolean;
    private icon = SPRITES.SHIP_ICON;

    private detectedByGravitationalRadar : boolean;
    private distanceToPlayerShip : number;
    private thisPlayerShip : boolean;

    private baseColor : number;

    constructor(game_object_config : ObjectInterfaces.IGameObject, thisPlayerShip : boolean) {
        super(game_object_config);
        this.thisPlayerShip = thisPlayerShip;
        this.detectedByGravitationalRadar = this.thisPlayerShip;
        this.distanceToPlayerShip = 0;

        this.iconSprite = GameScene.getInstance().addSprite(this.getPos().x, this.getPos().y, this.icon.sprite.key);
        this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        this.iconSprite.setInteractive();
        this.iconSprite.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.isHoverVar = false;
        this.hoverStateChange = false;

        this.iconSprite.on('pointerover', () => {
            //this.hoverStateChange = !this.isHoverOrSelected;
            this.isHoverVar = true;
        });
        this.iconSprite.on('pointerout', () =>  {
            //this.hoverStateChange = this.isHoverOrSelected;
            this.isHoverVar = false;
        });
        this.iconSprite.on('pointerdown', () =>  {
            this.select();
        });

        this.baseColor = 0xffffff;
    }

    public update() {
        super.update();
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * GlobalData.cameraZoom, SPRITES.SHIP_ICON.sprite.height * GlobalData.cameraZoom);
        this.iconSprite.x = this.getPos().x;
        this.iconSprite.y = this.getPos().y;
        
        this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        if(this.isSelected() || this.isHover() || this.isTarget()) {
            this.iconSprite.alpha = this.ICON_ALPHA_HOVER;
        }

        //@ts-ignore
        this.distanceToPlayerShip = Math.floor(GlobalData.playerShip.getPos().distance(this.getPos()));
        this.calculateIsDetectedByRadar();

        this.setIconTint(this.isTarget() ? 0xff0000 : this.baseColor);
        //this.setIsHover(this.isSelected());
    }

    public destroy() {
        this.iconSprite.destroy();
        super.destroy();   
    }

    public setIsHover(value : boolean) {
        this.isHoverVar = value;
    }

    protected setIconTint(color : number) {
        this.iconSprite.tint = color;
    }

    protected setIconBaseColor(color : number) {
        this.baseColor = color;
    }

    public getIconPath() {
        return "assets/sprite/" + this.icon.sprite.file;
    }

    public isDetectedByGravitationalRadar(): boolean {
        return this.detectedByGravitationalRadar;
    }

    public getDistanceToPlayerShip() : number {
        return this.distanceToPlayerShip;
    }

    private calculateIsDetectedByRadar() {
        if(this.thisPlayerShip) {
            //@ts-ignore
            let playerShip : Ship =  GlobalData.playerShip;
            let gravityRadarRange : number = playerShip.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.radar_range];

            this.detectedByGravitationalRadar = false;

            if(this.getDistanceToPlayerShip() <= gravityRadarRange) {
                this.detectedByGravitationalRadar = true;
            }
        }
    }

    public isThisPlayerShip() : boolean {
        return this.thisPlayerShip;
    }

    public select() {
        let event : Events.SELECTION_CHANGE_REQUEST_EVENT_CONFIG = {
            eventId : Events.EEventType.SELECTION_CHANGE_REQUEST_EVENT,
            data : { 
                object: this
            }
        }
        EventHandler.pushEvent(event);
    }

    public isSelected() : boolean {
        return GlobalData.selectedObject == this;
    }

    public isTarget() : boolean {
        return GlobalData.targetObject == this;
    }

    public isHover() : boolean {
        return this.isHoverVar;
    }
}