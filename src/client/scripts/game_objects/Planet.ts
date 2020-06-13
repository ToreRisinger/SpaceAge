import { MPlanet } from "../modules/planet/MPlanet";
import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";

export class Planet extends RadarDetectable {

    private planetData: MPlanet.IPlanet;

    constructor(planetData: MPlanet.IPlanet) {
        super(planetData, SPRITES.SHIP_ICON.sprite, false, true);
        this.planetData = planetData;
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