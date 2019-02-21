import { CONSTANTS } from "../constants/CONSTANTS";
import { GameObjectHandler } from "../modules/GameObjectHandler"
import { EventHandler } from "../modules/EventHandler"
import { Chat } from "../modules/Chat";
import { Com } from "../modules/Com"
import { InputHandler } from "../modules/InputHandler"

export class GameScene extends Phaser.Scene{
    
    constructor() {
        super({
            key: CONSTANTS.SCENES.GAME
        })
    }

    static getInstance() {
        return this;
    }

    init() {
        InputHandler.init(this);
        EventHandler.init();
        GameObjectHandler.init();
        Chat.init();
        Com.init();
    }

    preload() {
        this.anims.create({
            key: "main_module_I_common",
            frameRate: 4,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers(CONSTANTS.SPRITE.MAIN_MODULE_I_COMMON_SPRITE, {
                frames: [0, 1, 2, 3]
            })
        });
    }

    create() {
        this.add.image(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1).setOrigin(0, 0);
        let ship_sprite: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, CONSTANTS.SPRITE.MAIN_MODULE_I_COMMON_SPRITE);

        ship_sprite.play("main_module_I_common");
    }

    update(time : number, delta : number) { //delta 16.666 @ 60fps
        InputHandler.update(time, delta);
        EventHandler.update(time, delta);
        GameObjectHandler.update(time, delta);
        Chat.update(time, delta);
    }
}