import { ObjectInterfaces } from "../../shared/scripts/ObjectInterfaces";
import { IdHandler } from "../IdHandler";
import { ItemFactory } from "../ItemFactory";
import { Items } from "../../shared/scripts/Items";
import { Stats } from "../../shared/stats/Stats";
import { Sector } from "../Sector";

export class SShip {

    private ship: ObjectInterfaces.IShip;

    public static createNewShip() : SShip {
        let ship : ObjectInterfaces.IShip = {
            id: IdHandler.getNewGameObjectId(),
            x : 0,
            y : 0,
            meters_per_second: 0,
            isMoving : false,
            hasDestination : false,
            isAttacking : false,
            isMining : false,
            hasWeapon : false,
            hasMiningLaser : false,
            isWarping : false,
            warpDestination : [0, 0],
            warpSource : [0, 0],
            targetId : -1,
            destVec : [0, 0],
            velVec : [0, 0],
            modules : [
                          //TODO load from data base, dont create new shit
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.POWER_MODULE, 1), x: -1, y : -1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.SHIELD_MODULE, 1), x: 0, y : -1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.LASER_MODULE, 1), x: 1, y : -1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ENGINE_MODULE, 1), x: -1, y : 0},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.MAIN_MODULE, 1), x: 0, y : 0},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.CARGO_HOLD_MODULE, 1), x: 1, y : 0},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.MINING_LASER_MODULE, 1), x: -1, y : 1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.RADAR_MODULE, 1), x: 0, y : 1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 1, y : 1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 1, y : 2},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 1, y : 3},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 1, y : 4},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 2, y : 1},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 3, y : 2},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 4, y : 3},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 5, y : 4},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 6, y : 5},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 7, y : 6},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 8, y : 7},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 9, y : 8},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 10, y : 9},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 11, y : 10},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 12, y : 11},
                          {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 13, y : 12}
                      ],
            stats : {
              [Stats.EStatType.acceleration] : 0,
              [Stats.EStatType.max_speed] : 0,
              [Stats.EStatType.thrust] : 0,
              [Stats.EStatType.mass] : 0,
              [Stats.EStatType.power] : 0,
              [Stats.EStatType.hull] : 0,
              [Stats.EStatType.armor] : 0,
              [Stats.EStatType.shield] : 0,
              [Stats.EStatType.radar_range] : 0,
              [Stats.EStatType.shield_generation] : 0,
              [Stats.EStatType.armor_impact_resistance] : 0,
              [Stats.EStatType.armor_heat_resistance] : 0,
              [Stats.EStatType.armor_explosion_resistance] : 0,
              [Stats.EStatType.target_dodge_reduction] : 0,
              [Stats.EStatType.cargo_hold] : 0,
              [Stats.EStatType.dodge] : 0,
              [Stats.EStatType.radar_signature_reduction] : 0,
              [Stats.EStatType.weapon_range] : 0,
              [Stats.EStatType.explosive_dps] : 0,
              [Stats.EStatType.impact_dps] : 0,
              [Stats.EStatType.heat_dps] : 0,
              [Stats.EStatType.normal_dps] : 0,
              [Stats.EStatType.mining_laser_strength] : 0,
              [Stats.EStatType.mining_laser_range] : 0
            },
            properties : {
              currentArmor: 0,
              currentHull : 0,
              currentShield : 0
            }
        }  
  
        let updatedShip = this.updateShipProperties(ship);
  
        for(let i = 0; i < ship.modules.length; i++) {
        let mod = ship.modules[i].moduleItem;
        if(mod.itemType == Items.EModuleItemType.MINING_LASER_MODULE) {
            ship.hasMiningLaser = true;
        }
  
        if(mod.itemType == Items.EModuleItemType.TURRET_MODULE ||
            mod.itemType == Items.EModuleItemType.LASER_MODULE ||
            mod.itemType == Items.EModuleItemType.RAIL_GUN_MODULE ||
            mod.itemType == Items.EModuleItemType.MINING_LASER_MODULE) {
                ship.hasWeapon = true;
            }
        }
  
        return new SShip(updatedShip);
    }

    public static createShip(ship: ObjectInterfaces.IShip) : SShip {
        return new SShip(ship);
    }

    private constructor(ship: ObjectInterfaces.IShip) {
        this.ship = ship;
    }

    public getData() : ObjectInterfaces.IShip {
        return this.ship;
    }

    public updateShipStats() {
        SShip.updateShipProperties(this.ship);
    }

    public resetState() {
        this.ship.isMoving = false;
        this.ship.isWarping = false;
        this.ship.meters_per_second = 0;
        this.ship.targetId = -1;
        this.ship.warpDestination = [0, 0];
        this.ship.warpSource = [0, 0];
        this.ship.destVec = [0, 0];
        this.ship.velVec = [0, 0];
        this.ship.isWarping = false;
        this.ship.isMining = false;
    }

    public stopAttack() {
        this.ship.isAttacking = false;
    }

    public startAttack(targetId : number) {
        if(targetId != undefined && targetId > 0) {
            this.ship.isAttacking = true;
            this.ship.targetId = targetId;
        }
    }

    public stopMining() {
        this.ship.isMining = false;
    }

    public startMining(targetId : number) {
        if(targetId != undefined && targetId > 0) {
            this.ship.isMining = true;
            this.ship.targetId = targetId;
        }
    }

    public newDestination(x: number, y: number) {
        let xLength = this.ship.x - x;
        let yLength = this.ship.y - y;
        let length = Math.sqrt(xLength * xLength + yLength * yLength);
        if(length != 0) {
            this.ship.isMoving = true;
            this.ship.destVec = [x, y];
            this.ship.hasDestination = true;
        } 
    }

    public stopMove() {
        this.ship.hasDestination = false;
    }

    public startWarp(sector: Sector) {
            this.ship.isWarping = true;
            this.ship.warpDestination = [sector.getX(), sector.getY()];
            this.ship.warpSource = [this.ship.x, this.ship.y];
            this.ship.hasDestination = false;   
    }

    private static updateShipProperties(ship : ObjectInterfaces.IShip) : ObjectInterfaces.IShip {
        let newShip = ship;
        
        newShip.modules.forEach(
          //@ts-ignore
          module => module.moduleItem.module.stats.forEach(
            //@ts-ignore
            moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
          )
        );
  
        newShip.stats[Stats.EStatType.max_speed] = 1000;
        newShip.stats[Stats.EStatType.acceleration] = newShip.stats[Stats.EStatType.thrust] / newShip.stats[Stats.EStatType.mass]; 
        newShip.stats[Stats.EStatType.weapon_range] = 2000; //TODO average of all weapon modules
      
  
        newShip.properties.currentArmor = newShip.stats[Stats.EStatType.armor];
        newShip.properties.currentShield = newShip.stats[Stats.EStatType.shield];
        newShip.properties.currentHull = newShip.stats[Stats.EStatType.hull];
        return newShip;
    }
}