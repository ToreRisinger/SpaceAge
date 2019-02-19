import { CONSTANTS } from "../CONSTANTS";

export class GameScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.GAME
        })
    }

    init() {
        console.log("GameScene init()")
    }

    preload() {

    }

    create() {
        this.add.image(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1).setOrigin(0, 0);
        let ship_sprite: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, CONSTANTS.SPRITE.MAIN_MODULE_I_COMMON);

        this.anims.create({
            key: "main_module_I_common",
            frameRate: 4,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers(CONSTANTS.SPRITE.MAIN_MODULE_I_COMMON, {
                frames: [0, 1, 2, 3]
            })
        });

        ship_sprite.play("main_module_I_common");
    }
}