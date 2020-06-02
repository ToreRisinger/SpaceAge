import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { PacketFactory } from "./PacketFactory";
import { IClient } from "./interfaces/IClient";
import { Stats } from "../shared/stats/Stats";

const math = require('mathjs');
math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};

let UPDATES_PER_SECOND : number = 25;

export class Sector {

    protected ships : Map<number, ObjectInterfaces.IShip>;
    protected clients :  Map<number, IClient>;

    protected x : number;
    protected y : number;

    protected sector_x : number;
    protected sector_y : number;

    protected sectorName : string;

    protected id : number;

    constructor(
      sector_x : number,
      sector_y : number, 
      x : number, 
      y : number, 
      sectorName : string, 
      id : number) {
        this.sector_x = sector_x;
        this.sector_y = sector_y;
        this.x = x;
        this.y = y;
        this.sectorName = sectorName;
        this.id = id;

        this.ships = new Map<number, ObjectInterfaces.IShip>();
        this.clients = new Map<number, IClient>();
    }

    public getSectorX() {
      return this.sector_x;
    }

    public getSectorY() {
      return this.sector_y;
    }

    public getX() {
      return this.x;
    }

    public getY() {
      return this.y;
    }

    public getName() {
      return this.sectorName;
    }

    public getId() {
      return this.id;
    }

    public update40ms() {
      this.ships.forEach((ship: ObjectInterfaces.IShip, key: number) => {
        if(ship.isWarping) {
          this.updateWarpingShipPosition(ship);
        } else if(ship.isMoving || ship.hasDestination) {
          this.updateShipPosition(ship);
        }
      });
        
      this.sendShipUpdates();
    }

    public update1000ms() {
        this.ships.forEach((ship: ObjectInterfaces.IShip, key: number) => {
          if(ship.isAttacking) {
            this.handleAttackingShip(ship);
          }
        });

        /*
        TODO check if any ship died
        handleDestroyedShip(ship);
        */
    }

    public addClient(client : IClient) {
        this.clients.set(client.id, client);
        this.ships.set(client.character.ship.id, client.character.ship);
    }

    public removeClient(client : IClient) {
        this.clients.delete(client.id);
        this.ships.delete(client.character.ship.id);
        this.sendClientDisconnected(client.character.ship.id);
    }

    private sendClientDisconnected(disconnectedShipId : number) {
        let packet : any = PacketFactory.createPlayerDisconnectedPacket(disconnectedShipId);
        this.clients.forEach((client: IClient, key: number) => {
          client.socket.emit('ServerEvent', packet)
        });
    }

    private updateWarpingShipPosition(ship : ObjectInterfaces.IShip) {
      let totalLength = math.length(math.subtract(ship.warpDestination,[this.x + ship.warpSource[0], this.y + ship.warpSource[1]] ));
      let distanceTraveled = math.length(math.subtract([this.x + ship.warpSource[0], this.y + ship.warpSource[1]], [this.x + ship.x, this.y + ship.y]));;
      let shipToDest = math.subtract(ship.warpDestination, [this.x + ship.x, this.y + ship.y]);
      
      let speed = 1000000;
      let ratio = distanceTraveled / totalLength;
      let acceleration = 1 + ratio * speed;
      let velVec = math.multiply(math.multiply(shipToDest, 1/math.length(shipToDest)), acceleration);

      ship.x = ship.x + velVec[0];
      ship.y = ship.y + velVec[1];
      ship.meters_per_second = math.length(velVec) / UPDATES_PER_SECOND
    }

    private updateShipPosition(ship : ObjectInterfaces.IShip) {
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
          let directionVecAdjustmentVec = math.multiply(normalizedVelVecToMidPoint, shipAcceleration  / UPDATES_PER_SECOND);
          newVelVec = math.add(shipVelVec, directionVecAdjustmentVec);
      
          return newVelVec;
        }
        
        let shipAcceleration = ship.stats[Stats.EStatType.acceleration];
        let destVec = ship.destVec;
        let shipPosVec = [ship.x, ship.y];
        let shipToDestVec = math.subtract(destVec, shipPosVec);
        let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
        let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(ship.velVec, normalizedShipToDestVec));
        let badVelVecComp = math.subtract(ship.velVec, goodVelVecComp);
        
        if(ship.hasDestination) {
          if(math.length(shipToDestVec) <= shipAcceleration / UPDATES_PER_SECOND && math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
            ship.isMoving = false;
            ship.x = ship.destVec[0];
            ship.y = ship.destVec[1];
            ship.hasDestination = false;
          }
        } else if(math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
          ship.isMoving = false;
        }
          
        if(ship.isMoving) { 
          let newVelVec = ship.hasDestination
            ? calculateNewVelocityVector(shipToDestVec, ship.velVec, goodVelVecComp, badVelVecComp, shipAcceleration)
            : math.subtract(ship.velVec, math.multiply(ship.velVec, (shipAcceleration/UPDATES_PER_SECOND)/math.length(ship.velVec)));

          //newVelVec is NaN NaN
          let newVelVecLength = math.length(newVelVec);

          let shipMaxSpeed = ship.stats[Stats.EStatType.max_speed];
          if(newVelVecLength > shipMaxSpeed) {
            ship.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
          } else {
            ship.velVec = newVelVec;
            //Here velvec is destoyed 
          }

          ship.x = ship.x + ship.velVec[0] / UPDATES_PER_SECOND;
          ship.y = ship.y + ship.velVec[1] / UPDATES_PER_SECOND;
          ship.meters_per_second = math.length(ship.velVec);
        } else {
          ship.meters_per_second = 0;
          ship.velVec = [0, 0];
        }
    }

    private handleAttackingShip(attackingShip : ObjectInterfaces.IShip) {
        let targetShip = this.ships.get(attackingShip.targetId);
        if(targetShip != undefined) {
          let attackingShipPos = [attackingShip.x, attackingShip.y];
          let targetShipPos = [targetShip.x, targetShip.y];
          let attackingShipToTargetShipVec = math.subtract(attackingShipPos, targetShipPos);
          let attackingShipToTargetShipDistance : number = math.length(attackingShipToTargetShipVec);
          let attackingShipWeaponRange = attackingShip.stats[Stats.EStatType.weapon_range];
          if(attackingShipToTargetShipDistance <= attackingShipWeaponRange) {
            this.dealDamageToShip(targetShip, attackingShip.stats[Stats.EStatType.normal_dps], Stats.EDamageType.NORMAL_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[Stats.EStatType.explosive_dps], Stats.EDamageType.EXPLOSIVE_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[Stats.EStatType.heat_dps], Stats.EDamageType.HEAT_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[Stats.EStatType.impact_dps], Stats.EDamageType.IMPACT_DAMAGE);
          } 
        }
      }
  
      private dealDamageToShip(ship : ObjectInterfaces.IShip, damage : number, damageType : Stats.EDamageType) {
        let damageLeft = damage;
        let shield = ship.properties.currentShield;
        let armor = ship.properties.currentArmor;
        let hull = ship.properties.currentHull;
  
        //Damage to shield
        if(shield - damageLeft < 0) {
          damageLeft -= shield;
          ship.properties.currentShield = 0;
        } else {
          ship.properties.currentShield -= damageLeft;
          return;
        }
  
        //Damage to armor
        let damageTypeResistPercent = this.getDamageTypeResist(ship, damageType);
        let armorDamageAfterResist = math.floor(damageLeft * damageTypeResistPercent);
        if(armor - armorDamageAfterResist < 0) {
          damageLeft -= math.floor(armor / damageTypeResistPercent);
          ship.properties.currentArmor = 0;
        } else {
          ship.properties.currentArmor -= armorDamageAfterResist;
          return;
        }
  
        //Damage to hull
        if(hull - damageLeft < 0) {
          ship.properties.currentHull = 0;
        } else {
          ship.properties.currentHull -= damageLeft;
        }
      }
  
      private getDamageTypeResist(ship : ObjectInterfaces.IShip, damageType : Stats.EDamageType) : number {
        let resist : number = 0;
        switch(damageType) {
          case Stats.EDamageType.NORMAL_DAMAGE :
            resist = 1;
            break;
          case Stats.EDamageType.EXPLOSIVE_DAMAGE :
            resist = 1 - ship.stats[Stats.EStatType.armor_explosion_resistance] / 100;
            break;
          case Stats.EDamageType.HEAT_DAMAGE :
            resist = 1 - ship.stats[Stats.EStatType.armor_heat_resistance] / 100;
            break;
          case Stats.EDamageType.IMPACT_DAMAGE :
            resist = 1 - ship.stats[Stats.EStatType.armor_impact_resistance] / 100;
            break;  
        }
        return resist;
      }

    private sendShipUpdates() {
        let packet : any = PacketFactory.createShipsUpdatePacket(this.clients);
        this.clients.forEach((client: IClient, key: number) => {
          client.socket.emit("ServerEvent", packet);
        });
    }
}