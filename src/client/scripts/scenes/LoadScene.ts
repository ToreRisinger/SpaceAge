import { CONSTANTS } from "../constants/CONSTANTS";
import { SPRITES } from "../constants/SPRITES";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export class LoadScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD
        })
    }

    init() {
        
    }

    preload() {
        this.loadImage();
        this.loadAudio();
        this.loadSprites();

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent : number)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        })

        this.load.on("complete", ()=>{

        })
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