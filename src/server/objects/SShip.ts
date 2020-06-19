import { IShip } from "../../shared/data/gameobject/IShip";
import { EStatType } from "../../shared/data/stats/EStatType";
import { StatInfo } from "../../shared/data/stats/StatInfo";

export class SShip {

    private shipData: IShip;
    private _isPlayer: boolean;

    constructor(shipData: IShip, _isPlayer: boolean) {
        this.shipData = shipData;
        this._isPlayer = _isPlayer;
        this.updateStats();
    }

    public update40ms(): void {
        
    }
  
    public update1000ms(): void {
        this.updateShieldGeneration();
    }

    public getData() : IShip {
        return this.shipData;
    }

    public isPlayer(): boolean {
        return this._isPlayer;
    }

    public resetState() {
        this.shipData.state.isMoving = false;
        this.shipData.state.meters_per_second = 0;
        this.shipData.state.targetId = -1;
        this.shipData.state.destVec = [0, 0];
        this.shipData.state.velVec = [0, 0];
        this.shipData.state.isMining = false;
    }
  
    public stopAttack() {
        this.shipData.state.isAttacking = false;
    }
  
    public startAttack(targetId : number) {
        if(targetId != undefined && targetId > 0) {
            this.shipData.state.isAttacking = true;
            this.shipData.state.targetId = targetId;
        }
    }

    public stopMining() {
        this.shipData.state.isMining = false;
    }

    public startMining(targetId : number) {
        if(targetId != undefined && targetId > 0) {
            this.shipData.state.isMining = true;
            this.shipData.state.targetId = targetId;
        }
    }

    public newDestination(x: number, y: number) {
        let xLength = this.shipData.x - x;
        let yLength = this.shipData.y - y;
        let length = Math.sqrt(xLength * xLength + yLength * yLength);
        if(length != 0) {
            this.shipData.state.isMoving = true;
            this.shipData.state.destVec = [x, y];
            this.shipData.state.hasDestination = true;
        } 
    }

    public stopMove() {
        this.shipData.state.hasDestination = false;
    }

    protected applyShipModuleStats(): void {
        this.shipData.modules.forEach(
          //@ts-ignore
          module => module.moduleItem.module.stats.forEach(
            moduleProp => this.shipData.stats[moduleProp.property] = this.shipData.stats[moduleProp.property] + moduleProp.value
          )
        );
  
        this.shipData.stats[EStatType.max_speed] = 1000;
        this.shipData.stats[EStatType.acceleration] = this.shipData.stats[EStatType.thrust] / this.shipData.stats[EStatType.mass]; 
        this.shipData.stats[EStatType.weapon_range] = 2000; //TODO average of all weapon modules
      
  
        this.shipData.properties.currentArmor = this.shipData.stats[EStatType.armor];
        this.shipData.properties.currentShield = this.shipData.stats[EStatType.shield];
        this.shipData.properties.currentHull = this.shipData.stats[EStatType.hull];
    }

    protected calculateStats() {
        this.shipData.stats[EStatType.dodge] = StatInfo.getRatingToPercentage(this.shipData.stats[EStatType.acceleration], this.shipData.stats[EStatType.mass]);
    }

    protected updateShieldGeneration() {
        if(this.shipData.properties.currentShield < this.shipData.stats[EStatType.shield]) {
            this.shipData.properties.currentShield += this.shipData.stats[EStatType.shield_generation];
        }
    }

    private updateStats(): void {
        this.applyShipModuleStats();
        this.calculateStats();
    }
}