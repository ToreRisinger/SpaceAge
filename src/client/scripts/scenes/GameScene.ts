import { CONSTANTS } from "../constants/CONSTANTS";
import { Camera } from "../modules/Camera";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { GameController } from "../modules/GameController";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";

export enum EParticleManagerType {
    SMALL_BULLET,
    SHIELD_DAMAGE,
    ARMOR_DAMAGE,
    THRUST
}

export class GameScene extends Phaser.Scene {
    
    private static _instance : GameScene;
    private gameController : GameController = new GameController();

    private particleManagerMap: Map<EParticleManagerType, Phaser.GameObjects.Particles.ParticleEmitterManager>;

    constructor() {
        super({
            key: CONSTANTS.SCENES.GAME
        })
        GameScene._instance = this;
        this.particleManagerMap = new Map();
    }

    static getInstance() : GameScene {
        return GameScene._instance;
    }

    init() {
        
    }

    preload() {
        this.loadImage();
        this.loadAudio();
        this.loadSprites();
    }

    create() {
        this.createAnimations();
        this.createParticleManagers();
        this.gameController = new GameController();
        this.gameController.init();
        this.scale.on('resize', this.resize, this);
    }

    update(time : number, delta : number) { //delta 16.666 @ 60fps
        this.gameController.update(time, delta);
    }

    addSprite(x : number, y : number, sprite : string) {
        let ret = this.add.sprite(x, y, sprite);
        return ret;
    }

    playAnimation(sprite : Phaser.GameObjects.Sprite, animation : string) {
        sprite.play(animation);
    }

    loadImage() {
        this.load.setPath("./assets/image");

        for(let prop in CONSTANTS.IMAGE) {
            //@ts-ignore
            this.load.image(CONSTANTS.IMAGE[prop], CONSTANTS.IMAGE[prop]);
        }
    }

    loadAudio() {
        this.load.setPath("./assets/audio");
        
        for(let prop in CONSTANTS.AUDIO) {
            //@ts-ignore
            this.load.image(CONSTANTS.AUDIO[prop], CONSTANTS.AUDIO[prop]);
        }
    }

    loadSprites() {
        this.load.setPath("./assets/sprite");
        
        Object.entries(SPRITES).forEach(
            ([key, value]) => this.load.spritesheet(value.sprite.key, value.sprite.file, {frameHeight: value.sprite.height, frameWidth: value.sprite.width})
        );
    }

    createAnimations() {
       Object.values(SPRITES).filter(o => o.animation != undefined).forEach(
            sprite => this.anims.create({
                //@ts-ignore
                key: sprite.animation.key,
                //@ts-ignore
                frameRate: sprite.animation.frameRate,
                repeat: -1, //repeat forever
                frames: this.anims.generateFrameNumbers(sprite.sprite.key, {
                    //@ts-ignore
                    frames: sprite.animation.frames
                })
            })
       );

    }

    resize (gameSize : Phaser.Structs.Size, baseSize : Phaser.Structs.Size, displaySize : Phaser.Structs.Size) {
        var width = gameSize.width;
        var height = gameSize.height;

        Camera.setSize(width, height);
    }

    getSceneWidth() : number {
        return this.sys.game.canvas.width;
    }

    getSceneHeight() : number {
        return this.sys.game.canvas.height;
    }

    createParticleManagers() {
        let particleManager = GameScene.getInstance().add.particles(SPRITES.SMALL_BULLET.sprite.key);
        particleManager.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.particleManagerMap.set(EParticleManagerType.SMALL_BULLET, particleManager);
        
        particleManager = GameScene.getInstance().add.particles(SPRITES.SHIELD_DAMAGE_PARTICLE.sprite.key);
        particleManager.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.particleManagerMap.set(EParticleManagerType.SHIELD_DAMAGE, particleManager);   
        
        particleManager = GameScene.getInstance().add.particles(SPRITES.ARMOR_DAMAGE_PARTICLE.sprite.key);
        particleManager.setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        this.particleManagerMap.set(EParticleManagerType.ARMOR_DAMAGE, particleManager);   

        particleManager = GameScene.getInstance().add.particles(SPRITES.THRUST_PARTICLE.sprite.key);
        particleManager.setDepth(DRAW_LAYERS.BACKGROUND_EFFECT_LAYER);
        this.particleManagerMap.set(EParticleManagerType.THRUST, particleManager);  
    }

    getParticleManager(type: EParticleManagerType) {
        return this.particleManagerMap.get(type);
    }
}