import { GameScene, EParticleManagerType } from "../../scenes/GameScene";
import { Camera } from "../Camera";
import { ISprite } from "../../../../shared/interfaces/ISprite";

export module Graphics {
    
    export class Line {
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
                let cameraOffset = Camera.getCameraOffset();
                Line.line.setTo(this.startX + cameraOffset.x, this.startY + cameraOffset.y, this.endX + cameraOffset.x, this.endY + cameraOffset.y);
                this.lineGraphics.strokeLineShape(Line.line).setDepth(this.drawlayer);
            }
        }
    
        public setLineWidth(lineWidth: number) {
            this.lineWidth = lineWidth;
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

    export class Circle {
        private static circle: Phaser.Geom.Circle = new Phaser.Geom.Circle(0, 0, 0);
        private circleGraphics: Phaser.GameObjects.Graphics | undefined;
        private color: number;
        private lineWidth: number;
        private alpha: number;
        private drawlayer: number;
        private visible: boolean;
        private x: number;
        private y: number;
        private radius: number;
        private radiusScale: number;
        private scaleWithZoom: boolean;

        constructor(color : number, alpha : number, lineWidth: number, drawlayer: number, visible: boolean, radius: number, radiusScale: number, scaleWithZoom: boolean) {
            this.color = color;
            this.lineWidth = lineWidth;
            this.alpha = alpha;
            this.drawlayer = drawlayer;
            this.circleGraphics = undefined;
            this.visible = visible;
            this.x = 0;
            this.y = 0;
            this.radius = radius;
            this.radiusScale = radiusScale;
            this.scaleWithZoom = scaleWithZoom;
        }

        public update() {
            if(this.circleGraphics != undefined) {
                this.circleGraphics.destroy();
            }
    
            if(this.visible) {
                this.circleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: this.lineWidth, color: this.color, alpha: this.alpha}});
                let cameraOffset = Camera.getCameraOffset();
                let cameraScale = this.scaleWithZoom ? Camera.getZoom() : 1;
                Circle.circle.setTo(this.x + cameraOffset.x, this.y + cameraOffset.y, this.radius * this.radiusScale * cameraScale);
                this.circleGraphics.strokeCircleShape(Circle.circle).setDepth(this.drawlayer);
            }
        }

        public setLineWidth(lineWidth: number) {
            this.lineWidth = lineWidth;
        }
    
        public setPos(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    
        public setVisible(value: boolean): void {
            this.visible = value;
        }

        public setRadiusScale(scale: number) {
            this.radiusScale = scale;
        }

        public setRadius(radius: number) {
            this.radius = radius;
        }
    }

    export class ParticleEmitter {

        private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

        constructor(config: ParticleEmitterConfig, particleType: EParticleManagerType) {
            //@ts-ignore
            this.emitter = GameScene.getInstance().getParticleManager(particleType).createEmitter(config);
        }

        public stop() {
            this.emitter.stop();
        }

        public start() {
            this.emitter.start();
        }

        public setPos(x: number, y: number) {
            let cameraOffset = Camera.getCameraOffset();
            this.emitter.setPosition(x + cameraOffset.x, y + cameraOffset.y);
        }

        public setAngle(angle: number) {
            this.emitter.angle.onChange(angle);
        }

        public follow(sprite: Sprite) {
            this.emitter.startFollow(sprite.getSprite());
        }
    }

    export class Sprite {

        private sprite: Phaser.GameObjects.Sprite;
    
        constructor(sprite : ISprite, x: number, y: number) {
            this.sprite = GameScene.getInstance().addSprite(x, y, sprite.key);
        }
    
        public setAlpha(alpha: number): void {
            this.sprite.alpha = alpha;
        }
    
        public setInteractive(): void {
            this.sprite.setInteractive();
        }
    
        public setDepth(depth: number) {
            this.sprite.setDepth(depth);
        }
    
        public on(event: string | symbol, fn: Function, context?: any): Phaser.Events.EventEmitter {
            return this.sprite.on(event, fn);
        }
    
        public destroy(): void {
            this.sprite.destroy();
        }
    
        public setTint(tint: number): void {
            this.sprite.tint = tint;
        }
    
        public setDisplaySize(width: number, height: number) : this {
            this.sprite.setDisplaySize(width, height);
            return this;
        }
    
        public setPos(x: number, y: number): void {
            let cameraOffset = Camera.getCameraOffset();
            this.sprite.x = x + cameraOffset.x;
            this.sprite.y = y + cameraOffset.y;
        }
    
        public setVisible(visible: boolean): void {
            this.sprite.setVisible(visible);
        }

        public getSprite() : Phaser.GameObjects.Sprite {
            return this.sprite;
        }
    }
}