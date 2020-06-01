import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { Events } from "../../../shared/scripts/Events";
import { EventHandler } from "../modules/EventHandler";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GameObject } from "./GameObject";
import { GlobalDataService } from "../modules/GlobalDataService";
import { Ship } from "./Ship";

export abstract class RadarDetectable extends GameObject {

    private iconSprite : Phaser.GameObjects.Sprite;
    private isHoverVar : boolean;
    private ICON_ALPHA_DEFAULT : number = 0.5;
    private ICON_ALPHA_HOVER : number = 1;
    private icon : ObjectInterfaces.ISprite;

    private detected : boolean;
    private distanceToPlayerShip : number;
    private thisPlayerShip : boolean;

    private baseColor : number;
    private firstUpdate : boolean = true;
    private alwaysVisible : boolean;

    constructor(game_object_config : ObjectInterfaces.IGameObject, iconSprite : ObjectInterfaces.ISprite, thisPlayerShip : boolean, alwaysVisible : boolean) {
        super(game_object_config);
        this.thisPlayerShip = thisPlayerShip;
        this.alwaysVisible = alwaysVisible;
        this.detected = this.thisPlayerShip || this.alwaysVisible;
        this.distanceToPlayerShip = 0;

        this.icon = iconSprite;
        this.iconSprite = GameScene.getInstance().addSprite(this.getPos().x, this.getPos().y, this.icon.key);
        this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        this.iconSprite.setInteractive();
        this.iconSprite.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.isHoverVar = false;
        
        this.iconSprite.on('pointerover', () => {
            this.isHoverVar = true;
        });
        this.iconSprite.on('pointerout', () =>  {
            this.isHoverVar = false;
        });
        this.iconSprite.on('pointerdown', () =>  {
            this.select();
        });

        this.baseColor = 0xffffff;
    }

    protected abstract getRadarMass() : number;
    protected abstract setVisible(value : boolean) : void;
    public abstract getDisplayName() : string;

    public update() {
        super.update();

        if(this.firstUpdate) {
            this.calculateDetectedByRadar(this.getDistanceToPlayerShip(), this.getRadarMass());
            this.setVisibleOrInvisible();
        }
        
        this.calculateDistanceToPlayerShip();
        let isDetectedPreviousFrame = this.isDetected();
        this.calculateDetectedByRadar(this.getDistanceToPlayerShip(), this.getRadarMass());

        if(isDetectedPreviousFrame != this.isDetected()) {
            this.setVisibleOrInvisible();
        }

        if(this.isDetected()) {
            this.calculateIconAlpha();
            this.calculateIconSizeAndPos();
            if(!isDetectedPreviousFrame) {
                this.setIconTint(this.isTarget() ? 0xff0000 : this.baseColor);
            }
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
        return "assets/sprite/" + this.icon.file;
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
        return GlobalDataService.getInstance().getSelectedObject() == this;
    }

    public isTarget() : boolean {
        return GlobalDataService.getInstance().getTargetObject() == this;
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
        if(!(this.thisPlayerShip || this.alwaysVisible)) {
            let playerShip : Ship =  GlobalDataService.getInstance().getPlayerShip();
            let radarRange : number = playerShip.getShipData().stats[ObjectInterfaces.EShipStatType.radar_range];

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
        this.distanceToPlayerShip = Math.floor(GlobalDataService.getInstance().getPlayerShip().getPos().distance(this.getPos()));
    }

    private calculateIconAlpha() {
        if(this.isSelected() || this.isHover() || this.isTarget()) {
            this.iconSprite.alpha = this.ICON_ALPHA_HOVER;
        } else {
            this.iconSprite.alpha = this.ICON_ALPHA_DEFAULT;
        }
    }

    private calculateIconSizeAndPos() {
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * cameraZoom, SPRITES.SHIP_ICON.sprite.height * cameraZoom);
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