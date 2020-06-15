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
    private planetOrbit : Graphics.Circle;
    private mapPos: Phaser.Math.Vector2;
    private orbitMapPos: Phaser.Math.Vector2;

    private displayInformation: Array<string>;
    
    constructor(planetData: MPlanet.IPlanet) {
        super(planetData, SPRITES.PLANET_ICON.sprite, false, true);
        this.planetData = planetData;

        let thisPlanet = GlobalDataService.getInstance().getThisPlanet();
        let thisPlanetDistance = thisPlanet.distanceFromSun;
        this.planetOrbit = new Graphics.Circle(Colors.HEX.WHITE, 0.5, 1, DRAW_LAYERS.FOREGROUND_LAYER_1, true, planetData.distanceFromSun, 1, false);
        let point = new Phaser.Geom.Point(0, 0);
        if(planetData.name != thisPlanet.name) {
            point = this.planetOrbit.getRandomPoint(Utils.getRandomNumber(0, 100) / 100);
            point.x -= thisPlanetDistance;
        }
        let randomX = Utils.getRandomNumber(-5000, 5000);
        let randomY = Utils.getRandomNumber(-5000, 5000);
        this.setPos(point.x + randomX, point.y + randomY);
        this.planetOrbit.setPos(-thisPlanetDistance + randomX, randomY);

        this.sprite = new Graphics.Sprite(planetData.sprite.sprite, this.getPos().x, this.getPos().y);
        this.sprite.setDepth(DRAW_LAYERS.FOREGROUND_LAYER_2);
        this.sprite.setDisplaySize(planetData.diameter / 1000, planetData.diameter / 1000);
        this.mapPos = new Phaser.Math.Vector2(this.getPos().x, this.getPos().y);
        this.orbitMapPos = new Phaser.Math.Vector2(this.planetOrbit.getPos().x, this.planetOrbit.getPos().y);

        this.displayInformation = new Array(
            "Diameter: " + Utils.formatMeters(this.planetData.diameter), "Mass: " + this.planetData.mass);
    }

    public update() {
        super.update();
        this.sprite.update();
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

    public onSectorChanged(newSectorX : number, newSectorY : number) {
        this.setPos(this.mapPos.x - newSectorX, this.mapPos.y - newSectorY);
        this.sprite.setPos(this.mapPos.x - newSectorX, this.mapPos.y - newSectorY);
        this.planetOrbit.setPos(this.orbitMapPos.x - newSectorX, this.orbitMapPos.y - newSectorY)
    }

    public getDisplayInformation() : Array<string> {
        return this.displayInformation;
    }
}