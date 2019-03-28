import { GameScene } from "../scenes/GameScene";
import { GameObjectHandler } from "./GameObjectHandler";
import { Ship } from "../game_objects/Ship";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { Camera } from "./Camera";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";


export module Graphics {

    let line : Phaser.Geom.Line;
    let circle : Phaser.Geom.Circle;
    let lineGraphics : Phaser.GameObjects.Graphics;
    let circleGraphics : Phaser.GameObjects.Graphics;

    export function init() {
        
        line = new Phaser.Geom.Line(0, 0, 0, 0);
        circle = new Phaser.Geom.Circle(0, 0, 0);

        createNewLineGraphics(Camera.getZoom());
    }

    export function update(time : number, delta : number) {
        let cameraZoom = Camera.getZoom();

        lineGraphics.clear();
        circleGraphics.clear();

        createNewLineGraphics(cameraZoom);

        let ship : Ship | undefined = <Ship>GameObjectHandler.getShip();
       
        if(ship != undefined) {
            if(ship.getIsMoving()) {
                line.setTo(ship.getPos().x, ship.getPos().y, ship.getDestinationPos().x, ship.getDestinationPos().y);
                lineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
    
                circle.setTo(ship.getDestinationPos().x, ship.getDestinationPos().y, 5 * cameraZoom);
                circleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
            }
            
            circle.setTo(ship.getShipData().x, ship.getShipData().y, ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.radar_range]);
            circleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);

            circle.setTo(ship.getShipData().x, ship.getShipData().y, ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.gravity_detection_range]);
            circleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        }
    }

    function createNewLineGraphics(lineWidth : number) {
        lineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: 0x7F7F7F}});
        circleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: 0x7F7F7F}});
    }
}