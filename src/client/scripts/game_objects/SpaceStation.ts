import { RadarDetectable } from "./RadarDetectable";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Graphics } from "../modules/graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";
import { ISceneObject } from "../../../shared/data/gameobject/ISceneObject";
import { SceneObjectInfo } from "../../../shared/data/sceneobjects/SceneObjectInfo";

export class SpaceStation extends RadarDetectable {
    
    private data: ISceneObject;
    private spaceStationSprite: Graphics.Sprite;
    private spaceStationRadarSprite: Graphics.Sprite;
    private spaceStationSpriteRotation: number;
    private spaceStationRadarSpriteRotation: number;
    private displayInformation: Array<string>;
    private info: SceneObjectInfo.ISceneObjectInfo;

    constructor(data: ISceneObject) {
        super(data, SPRITES.SPACE_STATION_ICON.sprite, false, true, false);
        this.data = data;
        this.spaceStationSprite = new Graphics.Sprite(SPRITES.SPACE_STATION.sprite, Math.floor(this.data.x), Math.floor(this.data.y));
        this.spaceStationRadarSprite = new Graphics.Sprite(SPRITES.SPACE_STATION_RADAR.sprite, Math.floor(this.data.x + 400), Math.floor(this.data.y + 400));
        this.setupSprite();
        this.spaceStationSpriteRotation = 0;
        this.spaceStationRadarSpriteRotation = 0;
        this.displayInformation = new Array();
        this.info = SceneObjectInfo.getSceneObjectInfo(this.data.type);
    }

    public update(time: number, delta: number) {
        super.update(time, delta);
        
    }

    public updateGraphics(time: number, delta: number) {
        super.updateGraphics(time, delta);
        this.spaceStationSprite.setRotation(this.spaceStationSpriteRotation);
        this.spaceStationSpriteRotation += 0.0005;
        this.spaceStationRadarSprite.setRotation(this.spaceStationRadarSpriteRotation);
        this.spaceStationRadarSpriteRotation += 0.015;
        this.spaceStationSprite.update();
        this.spaceStationRadarSprite.update(); 
    }

    protected getRadarMass(): number {
        return 10000000;
    }

    protected setVisible(value : boolean) : void {
        this.spaceStationSprite.setVisible(value)
    }

    public getName(): string {
        return this.info.name;
    }

    public destroy() {
        this.spaceStationSprite.destroy();
        this.spaceStationRadarSprite.destroy();
        super.destroy();
    }

    public getDisplayInformation() : Array<string> {
        return this.displayInformation;
    }

    private setupSprite() {
        this.spaceStationSprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
        this.spaceStationSprite.setInteractive();
        this.spaceStationSprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.spaceStationSprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.spaceStationSprite.on('pointerdown', () => {
            this.select();
        });

        this.spaceStationRadarSprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
        this.spaceStationRadarSprite.setInteractive();
        this.spaceStationRadarSprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.spaceStationRadarSprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.spaceStationRadarSprite.on('pointerdown', () => {
            this.select();
        });
    }

}