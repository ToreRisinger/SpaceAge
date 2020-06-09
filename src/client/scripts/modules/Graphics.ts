import { GameScene } from "../scenes/GameScene";
import { Ship } from "../game_objects/Ship";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GlobalDataService } from "./GlobalDataService";
import { Stats } from "../../../shared/stats/Stats";
import { Colors } from "./colors/Colors";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";


export module Graphics {

    let line : Phaser.Geom.Line;
    let circle : Phaser.Geom.Circle;

    let destinationLineGraphics : Phaser.GameObjects.Graphics;
    let destinationCircleGraphics : Phaser.GameObjects.Graphics;
    let destinationGraphicsColor : number = 0x00FF00;

    let destinationCircleGrapicsScale : number;
    let destinationCircleGraphicsIsFadeIn : boolean;

    //Radar
    let radarRangeCircleGraphics : Phaser.GameObjects.Graphics;
    let radarRangeMaxCircleGraphics : Phaser.GameObjects.Graphics;
    let radarRangeColor : number = 0xFFFFFF;

    //Weapon
    let weaponRangeCircleGraphics : Phaser.GameObjects.Graphics;
    let weaponRangeColor : number = Colors.HEX.RED;

    //Mining
    let miningRangeCircleGraphics : Phaser.GameObjects.Graphics;
    let miningRangeColor : number = Colors.HEX.YELLOW;

    let showRadarRange : boolean = false;
    let showMiningRange : boolean = false;
    let showWeaponRange : boolean = false;

    export function init() {
        line = new Phaser.Geom.Line(0, 0, 0, 0);
        circle = new Phaser.Geom.Circle(0, 0, 0);
        destinationCircleGrapicsScale = 1;
        createNewLineGraphics(GlobalDataService.getInstance().getCameraZoom());
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();

        destinationLineGraphics.destroy();
        destinationCircleGraphics.destroy();
        
        if(weaponRangeCircleGraphics != undefined) {
            weaponRangeCircleGraphics.destroy();
        }
        
        if(miningRangeCircleGraphics != undefined) {
            miningRangeCircleGraphics.destroy();
        }
        
        if(radarRangeCircleGraphics != undefined) {
            radarRangeCircleGraphics.destroy();
            radarRangeMaxCircleGraphics.destroy();
        }
    
        GameScene.getInstance()

        createNewLineGraphics(cameraZoom);

        let ship : Ship = GlobalDataService.getInstance().getPlayerShip();
       
        if(ship != undefined) {
            let x = ship.getPos().x;
            let y = ship.getPos().y;
            if(ship.getIsMoving() && ship.getData().state.hasDestination) {
                line.setTo(x, y, ship.getDestinationPos().x, ship.getDestinationPos().y);
                destinationLineGraphics.strokeLineShape(line).setDepth(DRAW_LAYERS.DESTINATION_LINE_LAYER);

                destinationCircleGrapicsScale -= 0.05; 
                if(destinationCircleGrapicsScale < 1) {
                    destinationCircleGrapicsScale = 1;
                }

                circle.setTo(ship.getDestinationPos().x, ship.getDestinationPos().y, 5 * cameraZoom * destinationCircleGrapicsScale);
                destinationCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }

            if(showRadarRange) {
                circle.setTo(x, y, ship.getData().stats[Stats.EStatType.radar_range]);
                radarRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
                circle.setTo(x, y, ship.getData().stats[Stats.EStatType.radar_range] * 10);
                radarRangeMaxCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }

            if(showMiningRange) {
                circle.setTo(x, y, ship.getData().stats[Stats.EStatType.mining_laser_range]);
                miningRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }
            
            if(showWeaponRange) {
                circle.setTo(x, y, ship.getData().stats[Stats.EStatType.weapon_range]);
                weaponRangeCircleGraphics.strokeCircleShape(circle).setDepth(DRAW_LAYERS.GRAPHICS_LAYER);
            }
        }
    }

    function createNewLineGraphics(lineWidth : number) {
        destinationLineGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        destinationCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: destinationGraphicsColor, alpha: 0.5}});
        
        if(showRadarRange) {
            radarRangeCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: radarRangeColor, alpha: 0.3}});
            radarRangeMaxCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: radarRangeColor, alpha: 0.2}});
        }
       
        if(showWeaponRange) {
            weaponRangeCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: weaponRangeColor, alpha: 0.5}});
        }
        
        if(showMiningRange) {
            miningRangeCircleGraphics = GameScene.getInstance().add.graphics({lineStyle : { width: lineWidth, color: miningRangeColor, alpha: 0.5}});
        }
    }

    export function setShowMiningRange(value: boolean) {
        showMiningRange = value;
    }

    export function setShowWeaponRange(value: boolean) {
        showWeaponRange = value;
    }

    export function setShowRadarRange(value: boolean) {
        showRadarRange = value;
    }

    export function onNewDestination(event: Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG) {
        destinationCircleGrapicsScale = 2;
    }
    
    export function subscribeToEvents() {
        EventHandler.on(Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, onNewDestination);
    }