import { GameScene } from "../scenes/GameScene";
import { GameObjectHandler } from "./GameObjectHandler";
import { Ship } from "../game_objects/Ship";


export module Graphics {

    let line : Phaser.Geom.Line;
    let graphics : Phaser.GameObjects.Graphics;

    export function init() {
        

    }

    export function create() {
        graphics = GameScene.getInstance().add.graphics({lineStyle : { width: 1, color: 0x667DA8}});
        line = new Phaser.Geom.Line(0, 0, 0, 0);
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined = <Ship>GameObjectHandler.getShip();
        graphics.clear();
        if(ship != undefined && ship.getIsMoving()) {
            line.setTo(ship.getPos().x, ship.getPos().y, ship.getDestinationPos().x, ship.getDestinationPos().y);
            graphics.strokeLineShape(line);
        }
    }
}