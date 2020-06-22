import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/util/SPRITES";
import { IShipwreck } from "../../../shared/data/gameobject/IShipwreck";
import { Graphics } from "../modules/graphics/Graphics";
import { ICargo } from "../../../shared/data/ICargo";

export class CShipwreck extends RadarDetectable {
    
    private static SHIP_WRECK_MASS: number = 1000;
    private sprite: Graphics.Sprite;

    private data: IShipwreck;
    
    constructor(data: IShipwreck) {
        super(data, SPRITES.SHIPWRECK_ICON.sprite, false, false);
        this.data = data;
        this.sprite = new Graphics.Sprite(SPRITES.SHIPWRECK.sprite, data.x, data.y);
    }

    public update() {
        this.sprite.update();
        super.update();
    }

    public updateData(data: IShipwreck) {
        super.updateData(data);
        this.data = data;
    }

    protected getRadarMass(): number {
        return CShipwreck.SHIP_WRECK_MASS;
    }    
    
    public getName(): string {
        return "Shipwreck";
    }
    
    public getDisplayInformation(): string[] {
        return [];
    }

    protected setVisible(value: boolean): void {
        this.sprite.setVisible(value);
    }

    public getCargo(): ICargo {
        return this.data.cargo;
    }

    public destroy(): void {
        this.sprite.destroy();
    }
}