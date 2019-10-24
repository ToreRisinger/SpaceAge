import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GlobalData } from "../modules/GlobalData";
import { VisibleObject } from "./VisibleObject";

export class RadarDetectable extends VisibleObject {

    private detectedByGravitationalRadar : boolean;
    private detectedByProximityRadar : boolean;
    private distanceToPlayerShip : number;
    private thisPlayerShip : boolean;

    constructor(game_object_config : ObjectInterfaces.IGameObject, thisPlayerShip : boolean) {
        super(game_object_config);
        this.thisPlayerShip = thisPlayerShip;
        this.detectedByGravitationalRadar = this.thisPlayerShip;
        this.detectedByProximityRadar = this.thisPlayerShip;
        this.distanceToPlayerShip = 0;
    }

    public update() {
        super.update();
        //@ts-ignore
        this.distanceToPlayerShip = Math.floor(GlobalData.getPlayerShip().getPos().distance(this.getPos()));
        this.calculateIsDetectedByRadar();
    }

    public destroy() {
        super.destroy();   
    }

    public isDetectedByGravitationalRadar(): boolean {
        return this.detectedByGravitationalRadar;
    }

    public isDetectedByProximityRadar(): boolean {
        return this.detectedByProximityRadar;
    }

    public getDistanceToPlayerShip() : number {
        return this.distanceToPlayerShip;
    }

    private calculateIsDetectedByRadar() {
        if(this.thisPlayerShip) {
            //@ts-ignore
            let playerShip : Ship =  GlobalData.getPlayerShip();
            let proximityRadarRange : number = playerShip.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.proximity_radar_range];
            let gravityRadarRange : number = playerShip.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.gravity_radar_range];

            this.detectedByProximityRadar = false;
            this.detectedByGravitationalRadar = false;

            if(this.getDistanceToPlayerShip() <= proximityRadarRange) {
                this.detectedByProximityRadar = true;
                this.detectedByGravitationalRadar = true;
            } else if(this.getDistanceToPlayerShip() <= gravityRadarRange) {
                this.detectedByGravitationalRadar = true;
            }
        }
    }

    public isThisPlayerShip() : boolean {
        return this.thisPlayerShip;
    }
}