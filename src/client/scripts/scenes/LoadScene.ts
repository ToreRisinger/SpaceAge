import { CONSTANTS } from "../CONSTANTS";
import { Com } from "../modules/Com"
import { Chat } from "../modules/Chat";
import { EventHandler } from "../modules/EventHandler";
import { GameObjectHandler } from "../modules/GameObjectHandler";

export class LoadScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD
        })
    }

    init() {
        EventHandler.init();
        GameObjectHandler.init();
        Chat.init();
        Com.init();
    }

    preload() {
        this.loadImage();
        this.loadAudio();
        this.loadSprites({
            frameHeight: 38,
            frameWidth: 38
        });

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

    loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
        this.load.setPath("./assets/sprite");
        
        for(let prop in CONSTANTS.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CONSTANTS.SPRITE[prop], CONSTANTS.SPRITE[prop], frameConfig);
        }
    }
}