import { RadarDetectable } from "./RadarDetectable";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { Sectors } from "../../../shared/scripts/Sectors";

export class Sector extends RadarDetectable {
    
    private config : Sectors.ISector;

    constructor(sector_object_config : Sectors.ISector) {
        super(sector_object_config, SPRITES.SECTOR_ICON.sprite, false, true);
        this.config = sector_object_config;
    }

    protected getRadarMass(): number {
        return 0;
    }
    protected setVisible(value: boolean): void { }

    public getDisplayName(): string {
        return this.config.name;
    }
}