import { RadarDetectable } from "./RadarDetectable";
import { Graphics } from "../modules/graphics/Graphics";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Utils } from "../../../shared/util/Utils";
import { Colors } from "../../../shared/colors/Colors";
import { GlobalDataService } from "../modules/GlobalDataService";
import { SPRITES } from "../../../shared/util/SPRITES";
import { IPlanet } from "../../../shared/data/planet/IPlanet";

export class Planet extends RadarDetectable {

    private planetData: IPlanet;
    private sprite : Graphics.Sprite;
    private planetOrbit : Graphics.Circle;
    private mapPos: Phaser.Math.Vector2;
    private orbitMapPos: Phaser.Math.Vector2;

    private displayInformation: Array<string>;
    
    constructor(planetData: IPlanet) {
        super(planetData, SPRITES.PLANET_ICON.sprite, false, true);
        this.planetData = planetData;

        let thisPlanet = GlobalDataService.getInstance().getThisPlanet();
        let thisSectorPos = GlobalDataService.getInstance().getSector().getMapPos();
        let thisPlanetDistance = thisPlanet.distanceFromSun;
        this.planetOrbit = new Graphics.Circle(Colors.HEX.WHITE, 0.2, 1, DRAW_LAYERS.FOREGROUND_LAYER_1, true, planetData.distanceFromSun, 1, false);
        let point = new Phaser.Geom.Point(0, 0);
        if(planetData.name != thisPlanet.name) {
            point = this.planetOrbit.getRandomPoint(Utils.getRandomNumber(0, 100) / 100);
            point.x -= thisPlanetDistance;
        }
        let randomPoint = new Phaser.Geom.Point(Utils.getRandomNumber(-5000, 5000), Utils.getRandomNumber(-5000, 5000))
        point = new Phaser.Geom.Point(point.x + randomPoint.x, point.y + randomPoint.y);
        this.setPos(point.x - thisSectorPos.x, point.y - thisSectorPos.y);
        this.planetOrbit.setPos(randomPoint.x -thisPlanetDistance - thisSectorPos.x, thisSectorPos.y + randomPoint.y);
        this.mapPos = new Phaser.Math.Vector2(point.x, point.y);
        this.orbitMapPos = new Phaser.Math.Vector2(randomPoint.x - thisPlanetDistance, randomPoint.y);

        this.sprite = new Graphics.Sprite(planetData.sprite.sprite, this.getPos().x, this.getPos().y);
        this.sprite.setDepth(DRAW_LAYERS.FOREGROUND_LAYER_2);
        this.sprite.setDisplaySize(planetData.diameter / 1000, planetData.diameter / 1000);
        
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

    public onSectorChanged(newSectorX : number, newSectorY : number) {
        this.setPos(this.mapPos.x - newSectorX, this.mapPos.y - newSectorY);
        this.sprite.setPos(this.mapPos.x - newSectorX, this.mapPos.y - newSectorY);
        this.planetOrbit.setPos(this.orbitMapPos.x - newSectorX, this.orbitMapPos.y - newSectorY)
    }

    public getDisplayInformation() : Array<string> {
        return this.displayInformation;
    }

    public getName(): string {
        return this.planetData.name;
    }

    public getDiameter(): number {
        return this.planetData.diameter;
    }

    public getMass(): string {
        return this.planetData.mass;
    }

    public getDistanceToSun(): number {
        return this.planetData.distanceFromSun;
    }
}