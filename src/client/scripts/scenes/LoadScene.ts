import { CONSTANTS } from "../constants/CONSTANTS";
import { SPRITES } from "../constants/SPRITES";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";
import { EventHandler } from "../modules/EventHandler";
import { Com } from "../modules/Com";

export class LoadScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD
        })
    }

    init() {
        EventHandler.init();
        Com.init();
    }

    preload() {
        this.loadImage();
        this.loadAudio();
        this.loadSprites();
    }

    create() {
        this.scene.start(CONSTANTS.SCENES.MENU);
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