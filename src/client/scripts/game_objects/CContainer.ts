import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/util/SPRITES";
import { IContainer } from "../../../shared/data/gameobject/IContainer";
import { Graphics } from "../modules/graphics/Graphics";
import { ICargo } from "../../../shared/data/ICargo";

export class CContainer extends RadarDetectable {
    
    private static SHIP_WRECK_MASS: number = 1000;
    private sprite: Graphics.Sprite;

    private data: IContainer;
    
    constructor(data: IContainer) {
        super(data, SPRITES.CONTAINER_ICON.sprite, false, false, false);
        this.data = data;
        this.sprite = new Graphics.Sprite(SPRITES.CONTAINER.sprite, data.x, data.y);
        this.sprite.setScale(0.5);
    }

    public updateGraphics(time: number, delta: number) {
        super.updateGraphics(time, delta);
        this.sprite.update();
    }

    public updateData(data: IContainer) {
        super.updateData(data);
        this.data = data;
    }

    protected getRadarMass(): number {
        return CContainer.SHIP_WRECK_MASS;
    }    
    
    public getName(): string {
        return "Container";
    }
    
    public getDisplayInformation(): string[] {
        return [];
    }

    protected setVisible(value: boolean): void {
        super.setVisible(value);
        this.sprite.setVisible(value);
    }

    public getCargo(): ICargo {
        return this.data.cargo;
    }

    public setCargo(cargo: ICargo): void {
        this.data.cargo = cargo;
    }

    public destroy(): void {
        super.destroy();
        this.sprite.destroy();
    }
}