import { CCharacter } from "../../game_objects/CCharacter";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";
import { GlobalDataService } from "../GlobalDataService";
import { Colors } from "../../../../shared/colors/Colors";
import { EventHandler } from "../EventHandler";
import { Events } from "../../../../shared/util/Events";
import { Graphics } from "./Graphics";
import { Camera } from "../Camera";
import { EStatType } from "../../../../shared/data/stats/EStatType";

export module GraphicsEffects {

    let destinationLine : Graphics.Line;
    let destinationCircle: Graphics.Circle;
    let destinationGraphicsColor : number = Colors.HEX.GREEN;
    let destinationCircleGrapicsScale : number;

    //Radar
    let radarRangeCircle: Graphics.Circle;
    let radarMaxRangeCircle: Graphics.Circle;
    let radarRangeColor : number = Colors.HEX.WHITE;

    //Weapon
    let weaponRangeCircle: Graphics.Circle;
    let weaponRangeColor : number = Colors.HEX.RED;

    //Mining
    let miningRangeCircle: Graphics.Circle;
    let miningRangeColor : number = Colors.HEX.YELLOW;

    let showRadarRange : boolean = false;
    let showMiningRange : boolean = false;
    let showWeaponRange : boolean = false;

    export function init() {
        destinationCircleGrapicsScale = 1;

        destinationLine = new Graphics.Line(destinationGraphicsColor, 0.5, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false);
        destinationCircle = new Graphics.Circle(destinationGraphicsColor, 0.5, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false, 5, 1, true);
        radarRangeCircle = new Graphics.Circle(radarRangeColor, 0.3, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false, 0, 1, false);
        radarMaxRangeCircle = new Graphics.Circle(radarRangeColor, 0.2, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false, 0, 1, false);
        weaponRangeCircle = new Graphics.Circle(weaponRangeColor, 0.5, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false, 0, 1, false);
        miningRangeCircle = new Graphics.Circle(miningRangeColor, 0.5, Camera.getZoom(), DRAW_LAYERS.GRAPHICS_LAYER, false, 0, 1, false);
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();

        destinationLine.setVisible(false);
        destinationCircle.setVisible(false);
        miningRangeCircle.setVisible(showMiningRange);
        radarRangeCircle.setVisible(showRadarRange);
        radarMaxRangeCircle.setVisible(showRadarRange);
        weaponRangeCircle.setVisible(showWeaponRange);

        let ship : CCharacter = GlobalDataService.getInstance().getPlayerShip();
        let x = ship.getPos().x;
        let y = ship.getPos().y;
        if(ship.getIsMoving() && ship.hasDestination()) {
            destinationLine.setLineWidth(cameraZoom);

            destinationLine.setPos(x, y, ship.getDestinationVec().x, ship.getDestinationVec().y);
            destinationCircle.setPos(ship.getDestinationVec().x, ship.getDestinationVec().y);

            destinationCircleGrapicsScale -= 0.05; 
            if(destinationCircleGrapicsScale < 1) {
                destinationCircleGrapicsScale = 1;
            }
            destinationCircle.setRadiusScale(destinationCircleGrapicsScale);

            destinationLine.setVisible(true);
            destinationCircle.setVisible(true);
        }

        if(showRadarRange) {
            radarRangeCircle.setPos(x, y);
            radarRangeCircle.setRadius(ship.getStat(EStatType.radar_range));
            radarMaxRangeCircle.setPos(x, y);
            radarMaxRangeCircle.setRadius(ship.getStat(EStatType.radar_range) * 10);
        }

        if(showMiningRange) {
           miningRangeCircle.setPos(x, y);
           miningRangeCircle.setRadius(ship.getStat(EStatType.mining_laser_range));
        }
        
        if(showWeaponRange) {
           weaponRangeCircle.setPos(x, y);
           weaponRangeCircle.setRadius(ship.getStat(EStatType.weapon_range));
        }

        destinationLine.update();
        destinationCircle.update();
        radarRangeCircle.update();
        radarMaxRangeCircle.update();
        miningRangeCircle.update();
        weaponRangeCircle.update();    
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
}