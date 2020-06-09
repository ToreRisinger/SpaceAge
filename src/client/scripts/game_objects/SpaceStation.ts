import { RadarDetectable } from "./RadarDetectable";
import { ISpaceStation } from "../../../shared/interfaces/ISpaceStation";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { GameScene } from "../scenes/GameScene";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";

export class SpaceStation extends RadarDetectable {
    
    private spaceStationData: ISpaceStation;
    private spaceStationSprite: Phaser.GameObjects.Sprite;
    private spaceStationRadarSprite: Phaser.GameObjects.Sprite;
    private spaceStationSpriteRotation: number;
    private spaceStationRadarSpriteRotation: number;

    constructor(spaceStationData: ISpaceStation) {
        super(spaceStationData, SPRITES.SPACE_STATION_ICON.sprite, false, true);
        this.spaceStationData = spaceStationData;
        this.spaceStationSprite = GameScene.getInstance().addSprite(Math.floor(this.spaceStationData.x), Math.floor(this.spaceStationData.y), SPRITES.SPACE_STATION.sprite.key);
        this.spaceStationRadarSprite = GameScene.getInstance().addSprite(Math.floor(this.spaceStationData.x + 400), Math.floor(this.spaceStationData.y + 400), SPRITES.SPACE_STATION_RADAR.sprite.key);
        this.setupSprite();
        this.spaceStationSpriteRotation = 0;
        this.spaceStationRadarSpriteRotation = 0;
    }

    public update() {
        super.update();
        this.spaceStationSprite.setRotation(this.spaceStationSpriteRotation);
        this.spaceStationSpriteRotation += 0.0005;

        this.spaceStationRadarSprite.setRotation(this.spaceStationRadarSpriteRotation);
        this.spaceStationRadarSpriteRotation += 0.015;
    }

    protected getRadarMass(): number {
        return 10000000;
    }

    protected setVisible(value : boolean) : void {
        this.spaceStationSprite.setVisible(value)
    }

    public getDisplayName(): string {
        return this.spaceStationData.name;
    }

    public destroy() {
        this.spaceStationSprite.destroy();
        this.spaceStationRadarSprite.destroy();
        super.destroy();
    }

    private setupSprite() {
        this.spaceStationSprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
        this.spaceStationSprite.setInteractive();
        this.spaceStationSprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.spaceStationSprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.spaceStationSprite.on('pointerdown', () => {
            this.select();
        });

        this.spaceStationRadarSprite.setDepth(DRAW_LAYERS.SPACE_STATION_LAYER);
        this.spaceStationRadarSprite.setInteractive();
        this.spaceStationRadarSprite.on('pointerover', () => {
            this.setIsHover(true);
        });
        this.spaceStationRadarSprite.on('pointerout', () =>  {
            this.setIsHover(false);
        });
        this.spaceStationRadarSprite.on('pointerdown', () => {
            this.select();
        });
    }

}