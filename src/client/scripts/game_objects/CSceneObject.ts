import { RadarDetectable } from "./RadarDetectable";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Graphics } from "../modules/graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";
import { ISceneObject } from "../../../shared/data/gameobject/ISceneObject";
import { SceneObjectInfo } from "../../../shared/data/sceneobjects/SceneObjectInfo";

export class CSceneObject extends RadarDetectable {
    
    private data: ISceneObject;
    private info: SceneObjectInfo.ISceneObjectInfo;
    private sprite: Graphics.Sprite;

    constructor(data: ISceneObject) {
        super(data, SPRITES.SPACE_STATION_ICON.sprite, false, false, false);
        this.data = data;
        this.info = SceneObjectInfo.getSceneObjectInfo(this.data.type);
        this.sprite = new Graphics.Sprite(this.info.sprite, Math.floor(this.data.x), Math.floor(this.data.y));
        this.setupSprite();
    }

    public update(time: number, delta: number) {
        super.update(time, delta);
    }

    public updateGraphics(time: number, delta: number) {
        super.updateGraphics(time, delta);
        this.sprite.update();
    }

    protected getRadarMass(): number {
        return 10000;
    }

    protected setVisible(value : boolean) : void {
        super.setVisible(value);
        this.sprite.setVisible(value)
    }

    public getName(): string {
        return this.info.name;
    }

    public destroy() {
        this.sprite.destroy();
        super.destroy();
    }

    public getDisplayInformation() : Array<string> {
        return new Array();
    }

    private setupSprite() {
        this.sprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.sprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.sprite.on('pointerdown', () => {
            this.select();
        });
    }
}