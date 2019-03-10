import { CONSTANTS } from "../constants/CONSTANTS";
import { GameObjectHandler } from "../modules/GameObjectHandler"
import { EventHandler } from "../modules/EventHandler"
import { Chat } from "../modules/Chat";
import { InputHandler } from "../modules/InputHandler"
import { Camera } from "../modules/Camera";
import { Background } from "../modules/Background";
import { SPRITES } from "../constants/SPRITES";
import { Graphics } from "../modules/Graphics";
import { Com } from "../modules/Com";
import { GameStates } from "../modules/GameStates";

export class GameScene extends Phaser.Scene {
    
    private static _instance : GameScene;

    constructor() {
        super({
            key: CONSTANTS.SCENES.GAME
        })
        GameScene._instance = this;
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
        this.anims.create({
            key: SPRITES.MAIN_MODULE_I_COMMON_SPRITE.anims.ANIM_1.key,
            frameRate: 4,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers(SPRITES.MAIN_MODULE_I_COMMON_SPRITE.key, {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        });

        EventHandler.init();
        GameStates.init();
        Background.init();
        InputHandler.init();
        GameObjectHandler.init();
        Chat.init(); 
        Camera.init();
        Graphics.init();
        Com.init();
    }

    update(time : number, delta : number) { //delta 16.666 @ 60fps
        InputHandler.update(time, delta);
        EventHandler.update(time, delta);
        GameObjectHandler.update(time, delta);
        Chat.update(time, delta);
        Camera.update(time, delta);
        Background.update(time, delta);
        Graphics.update(time, delta);
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
            ([key, value]) => this.load.spritesheet(value.key, value.file, {frameHeight: value.height, frameWidth: value.width})
        );
    }
}