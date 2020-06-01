import { GameScene } from "../scenes/GameScene";
import { Ship } from "../game_objects/Ship";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalDataService } from "./GlobalDataService";


export module Graphics {

    let line : Phaser.Geom.Line;
    let circle : Phaser.Geom.Circle;

    let selectionLineGraphics : Phaser.GameObjects.Graphics;
    let selectionLineGraphicsColor : number = 0xFFFFFF;
    let targetLineGraphics : Phaser.GameObjects.Graphics;
    let targetLineGraphicsColor : number = 0xFF0000;
    let destinationLineGraphics : Phaser.GameObjects.Graphics;
    let destinationCircleGraphics : Phaser.GameObjects.Graphics;
    let destinationGraphicsColor : number = 0x00FF00;

    let radarRangeCircleGraphics : Phaser.GameObjects.Graphics;
    let radarRangeMaxCircleGraphics : Phaser.GameObjects.Graphics;
    let radarRangeColor : number = 0xFFFFFF;

    export function init() {

        line = new Phaser.Geom.Line(0, 0, 0, 0);

        circle = new Phaser.Geom.Circle(0, 0, 0);

        createNewLineGraphics(GlobalDataService.getInstance().getCameraZoom());
    }

    export function update(time : number, delta : number) {
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();

        selectionLineGraphics.destroy();
        targetLineGraphics.destroy();
        destinationLineGraphics.destroy();
        destinationCircleGraphics.destroy();
        radarRangeCircleGraphics.destroy();
        radarRangeMaxCircleGraphics.destroy();

        GameScene.getInstance()

        createNewLineGraphics(cameraZoom);

        let ship : Ship = GlobalDataService.getInstance().getPlayerShip();
       
        if(ship != undefined) {
            let x = ship.getPos().x;
            let y = ship.getPos().y;
            if(ship.getIsMoving() && ship.getShipData().hasDestination) {
                line.setTo(x, y, ship.getDestinationPos().x, ship.getDestinationPos().y);
                destinationLineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
    
                circle.setTo(ship.getDestinationPos().x, ship.getDestinationPos().y, 5 * cameraZoom);
                destinationCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }

            let selectedObject = GlobalDataService.getInstance().getSelectedObject();
            let targetObject = GlobalDataService.getInstance().getTargetObject();

            if(selectedObject != undefined && selectedObject != targetObject) {
                line.setTo(x, y, selectedObject.getPos().x, selectedObject.getPos().y);
                selectionLineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
            }

            if(targetObject != undefined) {
                line.setTo(x, y, targetObject.getPos().x, targetObject.getPos().y);
                targetLineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
            }

            circle.setTo(x, y, ship.getShipData().stats[ObjectInterfaces.EShipStatType.radar_range]);
            radarRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            circle.setTo(x, y, ship.getShipData().stats[ObjectInterfaces.EShipStatType.radar_range] * 10);
            radarRangeMaxCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        }
    }

    function createNewLineGraphics(lineWidth : number) {
        selectionLineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: selectionLineGraphicsColor, alpha: 0.5}});
        targetLineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: targetLineGraphicsColor, alpha: 0.5}});
        destinationLineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        destinationCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        radarRangeCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: radarRangeColor, alpha: 0.3}});
        radarRangeMaxCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: radarRangeColor, alpha: 0.2}});
    }
}