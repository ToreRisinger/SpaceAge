import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { IdHandler } from "./IdHandler";
import { ItemFactory } from "./ItemFactory";
import { Items } from "../shared/scripts/Items";

export module Database {

    export function getPlayerId(username : string) {
      return IdHandler.getNewPlayerId();
    }

    export function getPlayer(playerId : number, socket : any) : ObjectInterfaces.IPlayer {
        let items : Array<Items.IItem> = new Array();
        items.push(ItemFactory.createMineral(Items.EMineralItemType.DIAMOND_ORE, 1));
        items.push(ItemFactory.createMineral(Items.EMineralItemType.GOLD_ORE, 20));
        items.push(ItemFactory.createMineral(Items.EMineralItemType.IRON_ORE, 1));
        items.push(ItemFactory.createMineral(Items.EMineralItemType.TITANIUM_ORE, 1));
        items.push(ItemFactory.createMineral(Items.EMineralItemType.URANIUM_ORE, 1));
        items.push(ItemFactory.createModule(Items.EModuleItemType.SHIELD_MODULE, 1));
        items.push(ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 2));
        items.push(ItemFactory.createModule(Items.EModuleItemType.CLOAK_SYSTEM_MODULE, 3));
        items.push(ItemFactory.createModule(Items.EModuleItemType.RAIL_GUN_MODULE, 4));
        items.push(ItemFactory.createModule(Items.EModuleItemType.TRACKING_SYSTEM_MODULE, 5));

        let cargo : ObjectInterfaces.ICargo = {
          items : items
        }

        let ship : ObjectInterfaces.IShip = {
          id: IdHandler.getNewGameObjectId(),
          x : 0,
          y : 0,
          meters_per_second: 0,
          isMoving : false,
          hasDestination : false,
          isAttacking : false,
          targetId : -1,
          destVec : [0, 0],
          velVec : [0, 0],
          cargo : cargo,
          modules : [
                        //TODO load from data base, dont create new shit
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.POWER_MODULE, 1), x: -1, y : -1},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.SHIELD_MODULE, 1), x: 0, y : -1},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ENGINE_MODULE, 1), x: 1, y : -1},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.LASER_MODULE, 1), x: -1, y : 0},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.MAIN_MODULE, 1), x: 0, y : 0},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.CARGO_HOLD_MODULE, 1), x: 1, y : 0},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.CLOAK_SYSTEM_MODULE, 1), x: -1, y : 1},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.RADAR_MODULE, 1), x: 0, y : 1},
                        {moduleItem: ItemFactory.createModule(Items.EModuleItemType.ARMOR_MODULE, 1), x: 1, y : 1}
                    ],
          stats : {
            [ObjectInterfaces.EShipStatType.acceleration] : 0,
            [ObjectInterfaces.EShipStatType.max_speed] : 0,
            [ObjectInterfaces.EShipStatType.thrust] : 0,
            [ObjectInterfaces.EShipStatType.mass] : 0,
            [ObjectInterfaces.EShipStatType.power] : 0,
            [ObjectInterfaces.EShipStatType.hull] : 0,
            [ObjectInterfaces.EShipStatType.armor] : 0,
            [ObjectInterfaces.EShipStatType.shield] : 0,
            [ObjectInterfaces.EShipStatType.radar_range] : 0,
            [ObjectInterfaces.EShipStatType.shield_generation] : 0,
            [ObjectInterfaces.EShipStatType.armor_impact_resistance] : 0,
            [ObjectInterfaces.EShipStatType.armor_heat_resistance] : 0,
            [ObjectInterfaces.EShipStatType.armor_explosion_resistance] : 0,
            [ObjectInterfaces.EShipStatType.target_dodge_reduction] : 0,
            [ObjectInterfaces.EShipStatType.cargo_hold] : 0,
            [ObjectInterfaces.EShipStatType.dodge] : 0,
            [ObjectInterfaces.EShipStatType.radar_signature_reduction] : 0,
            [ObjectInterfaces.EShipStatType.weapon_range] : 0,
            [ObjectInterfaces.EShipStatType.explosive_dps] : 0,
            [ObjectInterfaces.EShipStatType.impact_dps] : 0,
            [ObjectInterfaces.EShipStatType.heat_dps] : 0,
            [ObjectInterfaces.EShipStatType.normal_dps] : 0,
            [ObjectInterfaces.EShipStatType.mining_laser_strength] : 0,
            [ObjectInterfaces.EShipStatType.mining_laser_range] : 0
          },
          properties : {
            currentArmor: 0,
            currentHull : 0,
            currentShield : 0
          }
        }  

        let updatedShip = updateShipProperties(ship);

        let newPlayer : ObjectInterfaces.IPlayer = {
          socket : socket,
          ship : updatedShip
        }

        return newPlayer;
    }

    function updateShipProperties(ship : ObjectInterfaces.IShip) : ObjectInterfaces.IShip {
      let newShip = ship;
      newShip.modules.forEach(
        //@ts-ignore
        module => module.moduleItem.module.stats.forEach(
          moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
        )
      );

      newShip.stats[ObjectInterfaces.EShipStatType.max_speed] = 1000;
      newShip.stats[ObjectInterfaces.EShipStatType.acceleration] = 
        newShip.stats[ObjectInterfaces.EShipStatType.thrust] / newShip.stats[ObjectInterfaces.EShipStatType.mass];


      //TODO weapon range average calculation  
      newShip.stats[ObjectInterfaces.EShipStatType.weapon_range] = 2000;

      newShip.properties.currentArmor = newShip.stats[ObjectInterfaces.EShipStatType.armor];
      newShip.properties.currentShield = newShip.stats[ObjectInterfaces.EShipStatType.shield];
      newShip.properties.currentHull = newShip.stats[ObjectInterfaces.EShipStatType.hull];
      return newShip;
    }

}