import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "../modules/GlobalData";
import { Events } from "../../../shared/scripts/Events";
import { EventHandler } from "../modules/EventHandler";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GameObject } from "./GameObject";

export abstract class RadarDetectable extends GameObject {

    private iconSprite : Phaser.GameObjects.Sprite;
    private isHoverVar : boolean;
    private ICON_ALPHA_DEFAULT : number = 0.5;
    private ICON_ALPHA_HOVER : number = 1;
    private icon = SPRITES.SHIP_ICON;

    private detected : boolean;
    private distanceToPlayerShip : number;
    private thisPlayerShip : boolean;

    private baseColor : number;

    constructor(game_object_config : ObjectInterfaces.IGameObject, thisPlayerShip : boolean) {
        super(game_object_config);
        this.thisPlayerShip = thisPlayerShip;
        this.detected = this.thisPlayerShip;
        this.distanceToPlayerShip = 0;

        this.iconSprite = GameScene.getInstance().addSprite(this.getPos().x, this.getPos().y, this.icon.sprite.key);
        this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        this.iconSprite.setInteractive();
        this.iconSprite.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.isHoverVar = false;

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

    protected abstract getRadarMass() : number;
    protected abstract setVisible(value : boolean) : void;

    public update() {
        super.update();
        
        this.calculateDistanceToPlayerShip();
        let isDetectedPreviousFrame = this.isDetected();
        this.calculateDetectedByRadar(this.getDistanceToPlayerShip(), this.getRadarMass());

        if(isDetectedPreviousFrame != this.isDetected()) {
            this.setVisibleOrInvisible();
        }


        if(this.isDetected()) {
            this.calculateIconSizeAndPos();
            this.calculateIconAlpha();
            this.setIconTint(this.isTarget() ? 0xff0000 : this.baseColor);
        }
    }

    public destroy() {
        this.iconSprite.destroy();
        super.destroy();   
    }

    public setIsHover(value : boolean) {
        this.isHoverVar = value;
    }


    public getIconPath() {
        return "assets/sprite/" + this.icon.sprite.file;
    }

    public isDetected(): boolean {
        return this.detected;
    }

    public getDistanceToPlayerShip() : number {
        return this.distanceToPlayerShip;
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

    protected setIconTint(color : number) {
        this.iconSprite.tint = color;
    }

    protected setIconBaseColor(color : number) {
        this.baseColor = color;
    }

    private calculateDetectedByRadar(distance : number, radarMass : number) {
        if(!this.thisPlayerShip) {
            //@ts-ignore
            let playerShip : Ship =  GlobalData.playerShip;
            let radarRange : number = playerShip.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.radar_range];

            this.detected = false;
            if(distance <= radarRange) {
                this.detected = true;
                return;
            }


            if(distance >= radarRange * 2) {
                this.detected = false;
                return;
            }

            let range = distance - radarRange;
            let rangePercentage = (range * 100) / radarRange;
            let radarEffectiveness = 1 / (Math.pow(10, rangePercentage / 90));
            if(radarMass * radarEffectiveness >= 1) {
                this.detected = true;
                return;
            }
        }
    }

    private calculateDistanceToPlayerShip() {
        //@ts-ignore
        this.distanceToPlayerShip = Math.floor(GlobalData.playerShip.getPos().distance(this.getPos()));
    }

    private calculateIconAlpha() {
        if(this.isSelected() || this.isHover() || this.isTarget()) {
            this.iconSprite.alpha = this.ICON_ALPHA_HOVER;
        } else {
            this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        }
    }

    private calculateIconSizeAndPos() {
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * GlobalData.cameraZoom, SPRITES.SHIP_ICON.sprite.height * GlobalData.cameraZoom);
        this.iconSprite.x = this.getPos().x;
        this.iconSprite.y = this.getPos().y;
    }

    private setVisibleOrInvisible() {
        if(this.isDetected()) {
            this.setVisible(true);
            this.iconSprite.setVisible(true);
        } else {
            this.setVisible(false);
            this.iconSprite.setVisible(false);
        }
    }
}