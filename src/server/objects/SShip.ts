import { IShip } from "../../shared/data/gameobject/IShip";
import { EStatType } from "../../shared/data/stats/EStatType";
import { StatInfo } from "../../shared/data/stats/StatInfo";
import { DamageService } from "../DamageService";
import { SSector } from "../sector/Sector";
import { SERVER_CONSTANTS } from "../constants/serverconstants";

const math = require('mathjs');

export class SShip {

    private shipData: IShip;
    private _isPlayer: boolean;
    private _isDestroyed: boolean;
    private destroyedById: number | undefined;

    constructor(shipData: IShip, _isPlayer: boolean) {
        this.shipData = shipData;
        this._isPlayer = _isPlayer;
        this._isDestroyed = false;
        this.destroyedById = undefined;
        this.updateStats();
    }

    public update40ms(sector: SSector): void {
        this.updateShipPosition();
    }
  
    public update1000ms(sector: SSector): void {
        this.updateShieldGeneration();
        this.handleAttackingShip(sector);
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

    public isDestroyed(): boolean {
        return this._isDestroyed;
    }

    public setDestroyed(destroyedById: number): void {
        this._isDestroyed = true;
        this.destroyedById = destroyedById;
    }

    public getDestroyedById(): number | undefined {
        return this.destroyedById;
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

    private updateShipPosition() {
        if(!this.getData().state.isMoving && !this.getData().state.hasDestination) {
            return;
        }

        let shipData: IShip = this.getData();
        function getMidPointVec(shipToDestVec :  Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
            function getDivider(goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
                if(math.length(badVelVecComp) != 0) {
                let lengthOfBadVelVecComp = math.length(badVelVecComp);
                let lengthOfBadVelVecCompSquared1 = lengthOfBadVelVecComp * lengthOfBadVelVecComp;
                //let lengthOfBadVelVecCompSquared2 = lengthOfBadVelVecCompSquared1 * lengthOfBadVelVecCompSquared1;
                //let lengthOfBadVelVecCompSquared3 = lengthOfBadVelVecCompSquared2 * lengthOfBadVelVecCompSquared2;
                //let lengthOfBadVelVecCompSquared4 = lengthOfBadVelVecCompSquared3 * lengthOfBadVelVecCompSquared3;
                let divider = lengthOfBadVelVecCompSquared1;
                return math.length(goodVelVecComp) / (math.length(goodVelVecComp) + divider);
                } else {
                return 1;
                }
            }
        
            let divider = getDivider(goodVelVecComp, badVelVecComp);
            if(divider < 0.25) {
                divider = 0.25;
            }
        
            let midPointVec = math.multiply(shipToDestVec, divider);
            return  midPointVec;
        }

        function calculateNewVelocityVector(shipToDestVec : Array<number>, shipVelVec : Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>, shipAcceleration : number) {
            let newVelVec = [0, 0];
            let midPoint = getMidPointVec(shipToDestVec, goodVelVecComp, badVelVecComp);
            let nrOfUpdatesUntilReachDestination = math.multiply(math.length(shipToDestVec), 1/math.length(goodVelVecComp));
            let nrOfStepsNeededToDecelerate = math.multiply(math.length(goodVelVecComp), 1/shipAcceleration)
            if(nrOfUpdatesUntilReachDestination <= nrOfStepsNeededToDecelerate) {
                midPoint = [0.5, 0.5];
            }
        
            let velVecToMidPoint = math.subtract(midPoint, shipVelVec);
            let normalizedVelVecToMidPoint = math.multiply(velVecToMidPoint, 1/math.length(velVecToMidPoint));
            let directionVecAdjustmentVec = math.multiply(normalizedVelVecToMidPoint, shipAcceleration  / SERVER_CONSTANTS.UPDATES_PER_SECOND);
            newVelVec = math.add(shipVelVec, directionVecAdjustmentVec);
        
            return newVelVec;
        }
                
        let acceleration = shipData.stats[EStatType.acceleration];
        let destVec = shipData.state.destVec;
        let shipPosVec = [shipData.x, shipData.y];
        let shipToDestVec = math.subtract(destVec, shipPosVec);
        let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
        let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(shipData.state.velVec, normalizedShipToDestVec));
        let badVelVecComp = math.subtract(shipData.state.velVec, goodVelVecComp);
        
        if(shipData.state.hasDestination) {
            if(math.length(shipToDestVec) <= acceleration / SERVER_CONSTANTS.UPDATES_PER_SECOND && math.length(shipData.state.velVec) - acceleration / SERVER_CONSTANTS.UPDATES_PER_SECOND <= 0) {
                shipData.state.isMoving = false;
                shipData.x = shipData.state.destVec[0];
                shipData.y = shipData.state.destVec[1];
                shipData.state.hasDestination = false;
            }
        } else if(math.length(shipData.state.velVec) - acceleration / SERVER_CONSTANTS.UPDATES_PER_SECOND <= 0) {
            shipData.state.isMoving = false;
        }
        
        if(shipData.state.isMoving) { 
            let newVelVec = shipData.state.hasDestination
                ? calculateNewVelocityVector(shipToDestVec, shipData.state.velVec, goodVelVecComp, badVelVecComp, acceleration)
                : math.subtract(shipData.state.velVec, math.multiply(shipData.state.velVec, (acceleration/SERVER_CONSTANTS.UPDATES_PER_SECOND)/math.length(shipData.state.velVec)));

            let newVelVecLength = math.length(newVelVec);

            let shipMaxSpeed = shipData.stats[EStatType.max_speed];
            if(newVelVecLength > shipMaxSpeed) {
                shipData.state.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
            } else {
                shipData.state.velVec = newVelVec;
            }
            shipData.x = shipData.x + shipData.state.velVec[0] / SERVER_CONSTANTS.UPDATES_PER_SECOND;
            shipData.y = shipData.y + shipData.state.velVec[1] / SERVER_CONSTANTS.UPDATES_PER_SECOND;
            shipData.state.meters_per_second = math.length(shipData.state.velVec);
        } else {
            shipData.state.meters_per_second = 0;
            shipData.state.velVec = [0, 0];
        }
    }

    private handleAttackingShip(sector: SSector) {
        if(!this.getData().state.isAttacking) {
            return;
        }

        let targetShip = sector.getShip(this.getData().state.targetId);
        if(targetShip != undefined) {
            let attackingShipPos = [this.getData().x, this.getData().y];
            let targetShipPos = [targetShip.getData().x, targetShip.getData().y];
            let attackingShipToTargetShipVec = math.subtract(attackingShipPos, targetShipPos);
            let attackingShipToTargetShipDistance : number = math.length(attackingShipToTargetShipVec);
            let attackingShipWeaponRange = targetShip.getData().stats[EStatType.weapon_range];
            if(attackingShipToTargetShipDistance <= attackingShipWeaponRange) {
                DamageService.attackShip(this, targetShip);
            }
        }
    }
}