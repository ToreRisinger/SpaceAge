import { GameScene } from "../scenes/GameScene";
import { Ship } from "../game_objects/Ship";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "./GlobalData";


export module Graphics {

    let line : Phaser.Geom.Line;
    let circle : Phaser.Geom.Circle;

    let destinationLineGraphics : Phaser.GameObjects.Graphics;
    let destinationCircleGraphics : Phaser.GameObjects.Graphics;
    let destinationGraphicsColor : number;

    let radarRangeCircleGraphics : Phaser.GameObjects.Graphics;
    let radarRangeColor : number;

    export function init() {
        
        radarRangeColor = 0xFFFFFF;
        destinationGraphicsColor = 0x00FF00;

        line = new Phaser.Geom.Line(0, 0, 0, 0);
        circle = new Phaser.Geom.Circle(0, 0, 0);

        createNewLineGraphics(GlobalData.cameraZoom);
    }

    export function update(time : number, delta : number) {
        let cameraZoom = GlobalData.cameraZoom;

        destinationLineGraphics.destroy();
        destinationCircleGraphics.destroy();
        radarRangeCircleGraphics.destroy();

        GameScene.getInstance()

        createNewLineGraphics(cameraZoom);

        //@ts-ignore
        let ship : Ship = GlobalData.getPlayerShip();
       
        if(ship != undefined) {
            let x = ship.getPos().x;
            let y = ship.getPos().y;
            if(ship.getIsMoving()) {
                line.setTo(x, y, ship.getDestinationPos().x, ship.getDestinationPos().y);
                destinationLineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);
    
                circle.setTo(ship.getDestinationPos().x, ship.getDestinationPos().y, 5 * cameraZoom);
                destinationCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }
            
            circle.setTo(x, y, ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.proximity_radar_range]);
            radarRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);

            circle.setTo(x, y, ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.gravity_radar_range]);
            radarRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
        }
    }

    function createNewLineGraphics(lineWidth : number) {
        destinationLineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        destinationCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        radarRangeCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: radarRangeColor, alpha: 0.2}});
    }
}