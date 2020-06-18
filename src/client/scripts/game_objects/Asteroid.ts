import { RadarDetectable } from "./RadarDetectable";
import { AsteroidInfo } from "../../../shared/data/astroid/AsteroidInfo";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Utils } from "../../../shared/util/Utils";
import { Graphics } from "../modules/graphics/Graphics";
import { IAsteroid } from "../../../shared/data/astroid/IAstroid";
import { SPRITES } from "../../../shared/util/SPRITES";
import { EMineralItemType } from "../../../shared/data/item/EMineralItemType";

export class Asteroid extends RadarDetectable {

    private asteroid_config : IAsteroid;
    private sprite : Graphics.Sprite;

    constructor(asteroid_config : IAsteroid) {
        super(asteroid_config, SPRITES.ASTEROID_ICON.sprite, false, false);
        this.asteroid_config = asteroid_config;
        this.sprite = new Graphics.Sprite(AsteroidInfo.getAsteroidInfo(this.asteroid_config.type).sprite, Math.floor(this.asteroid_config.x), Math.floor(this.asteroid_config.y));
        this.setupSprite();
    }

    public update() {
        super.update();
        this.sprite.update();
    }

    public destroy() {
        this.sprite.destroy();
        super.destroy();
    }

    public updateData(asteroid_config : IAsteroid) {
        super.updateData(asteroid_config);
        this.asteroid_config = asteroid_config;
    }

    public getCharacterName() : string {
        return AsteroidInfo.getAsteroidInfo(this.asteroid_config.type).name;
    }

    public getMineralType(): EMineralItemType {
        return this.asteroid_config.type;
    }

    public getHardness(): number {
        return this.asteroid_config.hardness;
    }

    public getSize(): number {
        return this.asteroid_config.size;
    }

    public getDisplayInformation() : Array<string> {
        let asteroidInfo = AsteroidInfo.getAsteroidInfo(this.asteroid_config.type);
        return new Array<string>(
                "Hardness: " + this.asteroid_config.hardness, 
                "Mineral:  " + asteroidInfo.mineral,
                "Size:   " + Math.round(this.asteroid_config.size) + " m²",
                "Mass:   " + Math.round(this.asteroid_config.size * asteroidInfo.massPerM2) + " kg",
            );
    }

    protected getRadarMass() : number {
       return this.asteroid_config.size * AsteroidInfo.getAsteroidInfo(this.asteroid_config.type).massPerM2;
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

