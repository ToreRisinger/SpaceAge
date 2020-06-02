import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { ISector } from "../../../shared/interfaces/ISector";

export class Sector extends RadarDetectable {
    
    private config : ISector;
    private map_x : number;
    private map_y : number;

    constructor(sector_object_config : ISector) {
        super(sector_object_config, SPRITES.SECTOR_ICON.sprite, false, true);
        this.config = sector_object_config;
        this.map_x = this.config.x;
        this.map_y = this.config.y;
    }

    public update() {
        super.update();
    }

    public getMapX() {
        return this.map_x;
    }

    public getMapY() {
        return this.map_y;
    }

    protected getRadarMass(): number {
        return 0;
    }
    protected setVisible(value: boolean): void { }

    public getDisplayName(): string {
        return this.config.name;
    }

    public onSectorChanged(newSectorX : number, newSectorY : number) {
        //@ts-ignore
        this.config.x = this.map_x - newSectorX;
        //@ts-ignore
        this.config.y = this.map_y - newSectorY;
    }
}