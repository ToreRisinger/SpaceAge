import { RadarDetectable } from "./RadarDetectable";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Graphics } from "../modules/graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";
import { ISceneObject } from "../../../shared/data/gameobject/ISceneObject";
import { SceneObjectInfo } from "../../../shared/data/sceneobjects/SceneObjectInfo";
import { Colors } from "../../../shared/colors/Colors";
import { GameConstants } from "../../../shared/constants/GameConstants";

export class WarpGate extends RadarDetectable {
    
    private data: ISceneObject;
    private sprite: Graphics.Sprite;
    private spriteRotation: number;
    private displayInformation: Array<string>;
    private info: SceneObjectInfo.ISceneObjectInfo;
    private rangeCircle: Graphics.Circle;
    private rangeColor : number = Colors.HEX.WHITE;

    constructor(data: ISceneObject) {
        super(data, SPRITES.WARP_GATE_ICON.sprite, false, true, false);
        this.data = data;
        this.sprite = new Graphics.Sprite(SPRITES.WARP_GATE.sprite, Math.floor(this.data.x), Math.floor(this.data.y));
        this.setupSprite();
        this.spriteRotation = 0;
        this.displayInformation = new Array();
        this.info = SceneObjectInfo.getSceneObjectInfo(this.data.type);
        this.rangeCircle = new Graphics.Circle(this.rangeColor, 0.3, 1, DRAW_LAYERS.GRAPHICS_LAYER, false, 0, 1, false);
        this.rangeCircle.setVisible(true);
    }

    public update(time: number, delta: number) {
        super.update(time, delta);
        
    }

    public updateGraphics(time: number, delta: number) {
        super.updateGraphics(time, delta);
        this.sprite.setRotation(this.spriteRotation);
        this.spriteRotation += 0.0005;
        this.sprite.update();
        this.rangeCircle.setPos(this.data.x, this.data.y);
        this.rangeCircle.setRadius(GameConstants.WARP_GATE_RANGE);
        this.rangeCircle.update();
    }

    public getRange(): number {
        return GameConstants.WARP_GATE_RANGE;
    }

    protected getRadarMass(): number {
        return 10000000;
    }

    protected setVisible(value : boolean) : void {
        this.sprite.setVisible(value);
        this.rangeCircle.setVisible(value);
    }

    public getName(): string {
        return this.info.name;
    }

    public destroy() {
        this.sprite.destroy();
        this.rangeCircle.destroy();
        super.destroy();
    }

    public getDisplayInformation() : Array<string> {
        return this.displayInformation;
    }

    private setupSprite() {
        this.sprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
    }
}