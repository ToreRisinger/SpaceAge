import { RadarDetectable } from "./RadarDetectable";
import { AsteroidData } from "../../../shared/scripts/AsteroidData";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { GameScene } from "../scenes/GameScene";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Utils } from "../../../shared/scripts/Utils";
import { Graphics } from "../modules/graphics/Graphics";

export class Asteroid extends RadarDetectable {

    private asteroid_config : AsteroidData.IAsteroid;
    private sprite : Graphics.Sprite;

    constructor(asteroid_config : AsteroidData.IAsteroid) {
        super(asteroid_config, SPRITES.ASTEROID_ICON.sprite, false, false);
        this.asteroid_config = asteroid_config;
        this.sprite = new Graphics.Sprite(AsteroidData.getAsteroidInfo(this.asteroid_config.type).sprite, Math.floor(this.asteroid_config.x), Math.floor(this.asteroid_config.y));
        this.setupSprite();
    }

    public update() {
        super.update();
        let pos = this.getPos();
        this.sprite.setPos(pos.x, pos.y);
    }

    public destroy() {
        this.sprite.destroy();
        super.destroy();
    }

    public getAsteroidData() : AsteroidData.IAsteroid {
        return this.asteroid_config;
    }

    public updateDataObjectConfig(asteroid_config : AsteroidData.IAsteroid) {
        super.updateDataObjectConfig(asteroid_config);
        this.asteroid_config = asteroid_config;
    }

    public getDisplayName() : string {
        return AsteroidData.getAsteroidInfo(this.asteroid_config.type).name;
    }

    protected getRadarMass() : number {
       return this.asteroid_config.size * AsteroidData.getAsteroidInfo(this.asteroid_config.type).massPerM2;
    }

    protected setVisible(value : boolean) : void {
        this.sprite.setVisible(value)
    }

    private setupSprite() {
        this.sprite.setDepth(DRAW_LAYERS.ASTEROID_LAYER);
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.sprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.sprite.on('pointerdown', () => {
            this.select();
        });

        let spriteSize = Utils.getRandomNumber(10, 50);
        this.sprite.setDisplaySize(spriteSize, spriteSize);
    }
}

