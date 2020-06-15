import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { Events } from "../../../shared/scripts/Events";
import { EventHandler } from "../modules/EventHandler";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GameObject } from "./GameObject";
import { GlobalDataService } from "../modules/GlobalDataService";
import { ISprite } from "../../../shared/interfaces/ISprite";
import { Stats } from "../../../shared/stats/Stats";
import { ICharacter } from "../../../shared/interfaces/ICharacter";
import { Graphics } from "../modules/graphics/Graphics";

export abstract class RadarDetectable extends GameObject {

    private iconSprite : Graphics.Sprite;
    private isHoverVar : boolean;
    private ICON_ALPHA_DEFAULT : number = 0.5;
    private ICON_ALPHA_HOVER : number = 1;
    private icon : ISprite;

    private detected : boolean;
    private distanceToPlayerShip : number;
    private thisPlayerShip : boolean;

    private baseColor : number;
    private firstUpdate : boolean = true;
    private alwaysVisible : boolean;

    constructor(game_object_config : ObjectInterfaces.IGameObject, iconSprite : ISprite, thisPlayerShip : boolean, alwaysVisible : boolean) {
        super(game_object_config);
        this.thisPlayerShip = thisPlayerShip;
        this.alwaysVisible = alwaysVisible;
        this.detected = this.thisPlayerShip || this.alwaysVisible;
        this.distanceToPlayerShip = 0;

        this.icon = iconSprite;
        this.iconSprite = new Graphics.Sprite(this.icon, this.getPos().x, this.getPos().y);
        this.iconSprite.setAlpha(this.ICON_ALPHA_DEFAULT);
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

        this.iconSprite.update();
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

    public abstract getDisplayInformation() : Array<string>;

    protected setIconTint(color : number) {
        this.iconSprite.setTint(color);
    }

    protected setIconBaseColor(color : number) {
        this.baseColor = color;
    }

    private calculateDetectedByRadar(distance : number, radarMass : number) {
        if(!(this.thisPlayerShip || this.alwaysVisible)) {
            let character : ICharacter =  GlobalDataService.getInstance().getCharacter();
            let radarRange : number = character.stats[Stats.EStatType.radar_range];

            this.detected = false;
            if(distance <= radarRange) {
                this.detected = true;
                return;
            }

            if(distance >= radarRange * 10) {
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
            this.iconSprite.setAlpha(this.ICON_ALPHA_HOVER);
        } else {
            this.iconSprite.setAlpha(this.ICON_ALPHA_DEFAULT);
        }
    }

    private calculateIconSizeAndPos() {
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
        this.iconSprite.setDisplaySize(SPRITES.SHIP_ICON.sprite.width * cameraZoom, SPRITES.SHIP_ICON.sprite.height * cameraZoom);
        this.iconSprite.setPos(this.getPos().x, this.getPos().y);
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