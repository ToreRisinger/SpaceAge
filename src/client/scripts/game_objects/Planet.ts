import { MPlanet } from "../modules/planet/MPlanet";
import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { Graphics } from "../modules/graphics/Graphics";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Utils } from "../../../shared/scripts/Utils";
import { Colors } from "../modules/colors/Colors";
import { GlobalDataService } from "../modules/GlobalDataService";

export class Planet extends RadarDetectable {

    private planetData: MPlanet.IPlanet;
    private sprite : Graphics.Sprite;
    private pos: Phaser.Math.Vector2;
    private angle: number;
    private distance: number;
    private planetOrbit : Graphics.Circle;
    
    constructor(planetData: MPlanet.IPlanet) {
        super(planetData, SPRITES.SHIP_ICON.sprite, false, true);
        let thisPlanet = GlobalDataService.getInstance().getThisPlanet();
        let thisPlanetDistance = thisPlanet.distanceFromSun;
        this.planetOrbit = new Graphics.Circle(Colors.HEX.WHITE, 0.5, 1, DRAW_LAYERS.GRAPHICS_LAYER, true, planetData.distanceFromSun, 1, false);
        this.planetOrbit.setPos(-thisPlanetDistance, 0);
        this.planetData = planetData;
        this.distance = this.planetData.distanceFromSun;
        this.angle = 6.28 * (Utils.getRandomNumber(1, 100) / 100); //2pi
        if(planetData.name == thisPlanet.name) {
            this.pos = new Phaser.Math.Vector2(0, 0);
            this.planetOrbit.setVisible(false);
        } else {
            let random = Utils.getRandomNumber(0, 100) / 100;
            let point = this.planetOrbit.getRandomPoint(random);
            this.pos = new Phaser.Math.Vector2(point.x, point.y);
            
            this.pos.x -= thisPlanetDistance;
        }

        this.planetData.x = this.pos.x;
        this.planetData.y = this.pos.y;
        this.updateDataObjectConfig(this.planetData);

        this.sprite = new Graphics.Sprite(SPRITES.MARS.sprite, this.pos.x, this.pos.y);
        this.sprite.setDepth(DRAW_LAYERS.FOREGROUND_LAYER);
        this.sprite.setDisplaySize(planetData.diameter / 1000, planetData.diameter / 1000);
    }

    public update() {
        super.update();
        this.sprite.setPos(this.pos.x, this.pos.y);
        this.planetOrbit.setVisible(true);
        this.planetOrbit.update();

    }

    protected getRadarMass(): number {
        return 0;
    }

    protected setVisible(value: boolean): void {
        
    }

    public getDisplayName(): string {
        return this.planetData.name;
    }
}