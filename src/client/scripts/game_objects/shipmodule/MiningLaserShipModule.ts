import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { Colors } from "../../../../shared/colors/Colors";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { GameObject } from "../GameObject";
import { ICharacter } from "../../../../shared/data/gameobject/ICharacter";
import { Graphics } from "../../modules/graphics/Graphics";
import { IShipModuleInstance } from "../../../../shared/data/IShipModuleInstance";
import { EStatType } from "../../../../shared/data/stats/EStatType";

export class MiningLaserShipModule extends ShipModule {

    private graphicsLine: Graphics.Line;

    constructor(ship: Ship, _module: IShipModuleInstance, thisPlayerShip: boolean) {
        super(ship, _module, thisPlayerShip);
        let drawLayer = thisPlayerShip ? DRAW_LAYERS.THIS_PLAYER_SHIP_EFFECT_LAYER : DRAW_LAYERS.OTHER_SHIP_EFFECT_LAYER;
        this.graphicsLine = new Graphics.Line(Colors.HEX.RED, 1.0, 2, drawLayer, false);
    }

    public update() {
        super.update();

        let ship : Ship = this.getShip();
        this.graphicsLine.setVisible(false); 
        if(ship.isMining()) {
            let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(ship.getTargetId());
            if(targetObject != undefined && this.astroidInRange(targetObject, ship)) {
                this.graphicsLine.setVisible(true);
                let targetPos = targetObject.getPos();
                this.graphicsLine.setPos(this.getCalculatedModuleX(), 
                    this.getCalculatedModuleY(), 
                    targetPos.x, targetPos.y);
            }
        }

        this.graphicsLine.update();
    }

    private astroidInRange(target : GameObject, ship : Ship): boolean {
        let range = ship.getStat(EStatType.mining_laser_range);
        let targetPos = target.getPos();
        let shipPos = ship.getPos();
        return targetPos.subtract(shipPos).length() <= range;
    }
}