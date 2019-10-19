import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { ShipSprite } from "./ShipSprite";
import { VisibleObject } from "./VisibleObject";
import { GlobalData } from "../modules/GlobalData";

export class Ship extends VisibleObject {

    private detectedByGravitationalRadar : boolean;
    private detectedByProximityRadar : boolean;
    private distanceToPlayerShip : number;

    private ship_config : ObjectInterfaces.IShip;
    //@ts-ignore
    private shipSprite : ShipSprite;
    private thisPlayerShip : boolean;

    constructor(ship_config : ObjectInterfaces.IShip, thisPlayerShip : boolean) {
        super(ship_config);
        this.ship_config = ship_config;
        this.thisPlayerShip = thisPlayerShip;

        this.detectedByGravitationalRadar = this.thisPlayerShip;
        this.detectedByProximityRadar = this.thisPlayerShip;
        this.distanceToPlayerShip = 0;

        this.buildShip();
    }

    public updateDataObjectConfig(ship_config : ObjectInterfaces.IShip) {
        super.updateDataObjectConfig(ship_config);
        this.ship_config = ship_config;
    }

    public update() {
        this.shipSprite.updateSpritePosition(this.getPos());
        super.update();

        //@ts-ignore
        this.distanceToPlayerShip = Math.floor(GlobalData.getPlayerShip().getPos().distance(this.getPos()));
        this.calculateIsDetectedByRadar();
    }

    public getIsMoving() {
        return this.ship_config.isMoving;
    }

    public getDestinationPos() {
        return new Phaser.Math.Vector2(Math.floor(this.ship_config.destinationX), Math.floor(this.ship_config.destinationY));
    }

    public destroy() {
        this.shipSprite.destroy();
        super.destroy();
    }

    public getShipData() :  ObjectInterfaces.IShip {
        return this.ship_config;
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

    private buildShip() {
        this.shipSprite = new ShipSprite(this.ship_config.modules, this.getPos(), this.thisPlayerShip, this);
    }

    private calculateIsDetectedByRadar() {
        if(!this.thisPlayerShip) {
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
}