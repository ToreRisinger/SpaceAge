import { ObjectInterfaces } from "../../shared/scripts/ObjectInterfaces";
import { IdHandler } from "../IdHandler";
import { ItemFactory } from "../ItemFactory";
import { Items } from "../../shared/scripts/Items";
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
                      ]
        }  

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
  
        return new SShip(ship);
    }

    public static createShip(ship: ObjectInterfaces.IShip) : SShip {
        return new SShip(ship);
    }

    private constructor(ship: ObjectInterfaces.IShip) {
        this.ship = ship;
    }

    public update() {
        
    }

    public getData() : ObjectInterfaces.IShip {
        return this.ship;
    }
}