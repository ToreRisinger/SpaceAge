import { GameScene } from "../../scenes/GameScene";

export class GraphicsLine {

    private static line : Phaser.Geom.Line = new Phaser.Geom.Line(0, 0, 0, 0);
    private lineGraphics: Phaser.GameObjects.Graphics | undefined;
    private color: number;
    private lineWidth: number;
    private alpha: number;
    private drawlayer: number;
    private visible: boolean;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(color : number, alpha : number, lineWidth: number, drawlayer: number, visible: boolean) {
        this.color = color;
        this.lineWidth = lineWidth;
        this.alpha = alpha;
        this.drawlayer = drawlayer;
        this.lineGraphics = undefined;
        this.visible = visible;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
    }

    public update(): void {
        if(this.lineGraphics != undefined) {
            this.lineGraphics.destroy();
        }

        if(this.visible) {
            this.lineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: this.lineWidth, color: this.color, alpha: this.alpha}});
            GraphicsLine.line.setTo(this.startX, this.startY, this.endX, this.endY);
            this.lineGraphics.strokeLineShape(GraphicsLine.line).setDepth(this.drawlayer);
        }
    }

    public setPos(startX: number, startY: number, endX: number, endY: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    public setVisible(value: boolean): void {
        this.visible = value;
    }
}