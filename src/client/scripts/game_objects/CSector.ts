import { RadarDetectable } from "./RadarDetectable";
import { ISector } from "../../../shared/data/sector/ISector";
import { SPRITES } from "../../../shared/util/SPRITES";

export class CSector extends RadarDetectable {
    
    private config : ISector;
    private map_x : number;
    private map_y : number;
    private displayInformation: Array<string>;

    constructor(sector_object_config : ISector, thisSector: ISector) {
        super(sector_object_config, SPRITES.SECTOR_ICON.sprite, false, true, false);
        this.config = sector_object_config;
        this.map_x = this.config.x;
        this.map_y = this.config.y;
        this.setPos(this.getMapPos().x - thisSector.x, this.getMapPos().y - thisSector.y);
        this.displayInformation = new Array();
    }

    public update() {
        super.update();
    }

    public getMapPos() {
        return new Phaser.Math.Vector2(this.map_x, this.map_y);
    }

    protected getRadarMass(): number {
        return 0;
    }
    protected setVisible(value: boolean): void { }

    public getName(): string {
        return this.config.name;
    }

    public onSectorChanged(newSectorX : number, newSectorY : number) {
        this.setPos(this.map_x - newSectorX, this.map_y - newSectorY);
    }

    public getDisplayInformation(): string[] {
        return this.displayInformation;
    }
}