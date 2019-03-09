import { GameScene } from "../scenes/GameScene";
import { GameObjectHandler } from "./GameObjectHandler";
import { Ship } from "../game_objects/Ship";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";


export module Graphics {

    let line : Phaser.Geom.Line;
    let circle : Phaser.Geom.Circle;
    let lineGraphics : Phaser.GameObjects.Graphics;
    let circleGraphics : Phaser.GameObjects.Graphics;

    export function init() {
        lineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: 1, color: 0x7F7F7F}});
        line = new Phaser.Geom.Line(0, 0, 0, 0);

        circleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: 1, color: 0x7F7F7F}});
        circle = new Phaser.Geom.Circle(0, 0, 0);
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined = <Ship>GameObjectHandler.getShip();
        lineGraphics.clear();
        circleGraphics.clear();
        if(ship != undefined && ship.getIsMoving()) {
            line.setTo(ship.getPos().x, ship.getPos().y, ship.getDestinationPos().x, ship.getDestinationPos().y);
            lineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);

            circle.setTo(ship.getDestinationPos().x, ship.getDestinationPos().y, 5);
            circleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
        }
    }
}