import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import { GraphicsLine } from "../../modules/graphics/GraphicsLine";
import { Colors } from "../../modules/colors/Colors";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { GameObject } from "../GameObject";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";
import { Stats } from "../../../../shared/stats/Stats";

export class MiningLaserShipModule extends ShipModule {

    private graphicsLine: GraphicsLine;

    constructor(ship: Ship, _module: ObjectInterfaces.IShipModuleInstance, thisPlayerShip: boolean) {
        super(ship, _module, thisPlayerShip);
        let drawLayer = thisPlayerShip ? DRAW_LAYERS.THIS_PLAYER_SHIP_EFFECT_LAYER : DRAW_LAYERS.OTHER_SHIP_EFFECT_LAYER;
        this.graphicsLine = new GraphicsLine(Colors.HEX.RED, 1.0, 2, drawLayer, false);
    }

    public update() {
        super.update();

        let shipData : ICharacter = this.getShip().getData();
        this.graphicsLine.setVisible(false); 
        if(shipData.state.isMining) {
            let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(shipData.state.targetId);
            if(targetObject != undefined && this.astroidInRange(targetObject, shipData)) {
                this.graphicsLine.setVisible(true);
                this.graphicsLine.setPos(this.getCalculatedModuleX(), 
                    this.getCalculatedModuleY(), 
                    targetObject.getGameObjectData().x, 
                    targetObject.getGameObjectData().y);
            }
        }

        this.graphicsLine.update();
    }

    private astroidInRange(target : GameObject, shipData : ICharacter): boolean {
        let range = shipData.stats[Stats.EStatType.mining_laser_range];
        let targetPos = new Phaser.Math.Vector2(target.getGameObjectData().x, target.getGameObjectData().y);
        let shipPos = new Phaser.Math.Vector2(shipData.x, shipData.y);
        return targetPos.subtract(shipPos).length() <= range;
    }
}