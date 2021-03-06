import { GameScene } from "../../scenes/GameScene";
import { Camera } from "../Camera";
import { ISprite, ISpriteAnimation } from "../../../../shared/data/ISprite";
import { SPRITES } from "../../../../shared/util/SPRITES";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";
import { GlobalDataService } from "../GlobalDataService";

export namespace Graphics {
    
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

        public destroy() {
            if(this.lineGraphics) {
                this.lineGraphics.destroy();
            }
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
            let cameraOffset = Camera.getCameraOffset();
            let cameraScale = this.scaleWithZoom ? Camera.getZoom() : 1;
            Circle.circle.setTo(this.x + cameraOffset.x, this.y + cameraOffset.y, this.radius * this.radiusScale * cameraScale);
        }

        public update() {
            if(this.circleGraphics != undefined) {
                this.circleGraphics.destroy();
            }
    
            if(this.visible) {  
                this.circleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: this.lineWidth * Camera.getZoom(), color: this.color, alpha: this.alpha}});
                
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

        public getPos() {
            return new Phaser.Math.Vector2(this.x, this.y);
        }

        public getRandomPoint(value: number) {
            return Circle.circle.getPoint(value);
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

        public destroy() {
            if(this.circleGraphics) {
                this.circleGraphics.destroy();
            }
        }
    }

    export class ParticleEmitter {

        private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
        private particleManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
        private x: number;
        private y: number;

        constructor(config: ParticleEmitterConfig, particleType: EParticleManagerType, drawLayer: number) {
            let particleInfo = getParticleInfo(particleType);
            this.particleManager = GameScene.getInstance().add.particles(particleInfo.sprite.sprite.key);
            this.particleManager.setDepth(drawLayer);
            //@ts-ignore
            this.emitter = this.particleManager.createEmitter(config);
            this.x = 0;
            this.y = 0;
        }

        public update() {
            let cameraOffset = Camera.getCameraOffset();
            this.emitter.setPosition(this.x + cameraOffset.x, this.y + cameraOffset.y);
        }

        public stop() {
            this.emitter.stop();
        }

        public start() {
            this.emitter.start();
        }

        public setPos(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public setAngle(angle: number) {
            this.emitter.angle.onChange(angle);
        }

        public follow(sprite: Sprite) {
            this.emitter.startFollow(sprite.getSprite());
        }

        public destroy() {
            this.particleManager.destroy();
        }

        public setVisible(value: boolean): void {
            this.particleManager.setVisible(value);
        }
    }

    export class Sprite {

        private sprite: Phaser.GameObjects.Sprite;
        private x: number;
        private y: number;
    
        constructor(sprite : ISprite, x: number, y: number) {
            this.x = x;
            this.y = y;
            this.sprite = GameScene.getInstance().addSprite(x, y, sprite.key);
        }

        public update() {
            let cameraOffset = Camera.getCameraOffset();
            this.sprite.x = this.x + cameraOffset.x;
            this.sprite.y = this.y + cameraOffset.y;
        }
    
        public setAlpha(alpha: number): void {
            this.sprite.alpha = alpha;
        }

        public setScale(scale: number): void {
            this.sprite.setScale(scale);
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

        public setRotation(rotation: number) : void {
            this.sprite.setRotation(rotation);
        }
    
        public setDisplaySize(width: number, height: number) : this {
            this.sprite.setDisplaySize(width, height);
            return this;
        }
    
        public setPos(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }
    
        public setVisible(visible: boolean): void {
            this.sprite.setVisible(visible);
        }

        public getSprite() : Phaser.GameObjects.Sprite {
            return this.sprite;
        }

        public placeOnCircle(point: Phaser.Math.Vector2, distance: number, angle: number) {
            let circle = new Phaser.Geom.Circle(point.x, point.y, distance);
            Phaser.Actions.PlaceOnCircle(Array.of(this.sprite), circle, angle);
        }
    }

    export class TargetSprite extends Sprite {
        
        private fadeInScale: number;
        private isFadingIn: boolean;
        private static SCALE_SPEED: number = 0.1;
        private static SCALE: number = 3;

        constructor(sprite : ISprite, x: number, y: number) {
            super(sprite, x, y);
            this.isFadingIn = false;
            this.fadeInScale = 0;
            this.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            this.setVisible(false);
        }

        public update() {
            let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
            if(this.isFadingIn) {
                this.setDisplaySize(SPRITES.SELECTION_ICON.sprite.width * this.fadeInScale * cameraZoom, 
                    SPRITES.SELECTION_ICON.sprite.height * this.fadeInScale * cameraZoom);
                    this.fadeInScale -= TargetSprite.SCALE_SPEED;
                if(this.fadeInScale <= 1) {
                    this.isFadingIn = false;
                }
            } else {
                this.setDisplaySize(SPRITES.SELECTION_ICON.sprite.width * cameraZoom, SPRITES.SELECTION_ICON.sprite.height * cameraZoom);
            }
            
            super.update();
        }

        public trigger() {
            this.isFadingIn = true;
            this.fadeInScale = TargetSprite.SCALE;
        }
    }

    export enum EParticleManagerType {
        SMALL_BULLET,
        SHIELD_DAMAGE,
        ARMOR_DAMAGE,
        THRUST
    }

    export interface IParticleInfo {
        sprite: ISpriteAnimation
    }

    const particleInfoMap : { [key: number]: IParticleInfo } = {
        
        [EParticleManagerType.SMALL_BULLET] : {
            sprite: SPRITES.SMALL_BULLET
        },
        [EParticleManagerType.SHIELD_DAMAGE] : {
            sprite: SPRITES.SHIELD_DAMAGE_PARTICLE
        },
        [EParticleManagerType.ARMOR_DAMAGE] : {
            sprite: SPRITES.ARMOR_DAMAGE_PARTICLE
        },
        [EParticleManagerType.THRUST] : {
            sprite: SPRITES.THRUST_PARTICLE
        }
    }

    export function getParticleInfo(type: EParticleManagerType) : IParticleInfo {
        return particleInfoMap[type];
    }

}