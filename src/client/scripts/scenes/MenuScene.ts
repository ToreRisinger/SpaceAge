import { CONSTANTS } from "../CONSTANTS";

export class MenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }

    init() {
        
    }

    preload() {

    }

    create() {
        this.scene.start(CONSTANTS.SCENES.GAME);
    }
}