import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { IdHandler } from "./IdHandler";
import { ItemFactory } from "./ItemFactory";
import { ShipModules } from "../shared/scripts/ShipModules"

export module Database {

    export function getPlayerId(username : string) {
      return IdHandler.getNewPlayerId();
    }

    export function getPlayer(playerId : number, socket : any) {
        let ship : ObjectInterfaces.IShip = {
          id: IdHandler.getNewGameObjectId(),
          x : 0,
          y : 0,
          meters_per_second: 0,
          isMoving : false,
          hasDestination : false,
          destVec : [0, 0],
          velVec : [0, 0],
          modules : [
                        //TODO load from data base, dont create new shit
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.POWER_GENERATOR_MODULE_I, 1), x: -1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.SHIELD_GENERATOR_MODULE_I, 1), x: 0, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE_I, 1), x: 1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.LASER_MODULE_I, 1), x: -1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I, 1), x: 0, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE_I, 1), x: 1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.AVOIDANCE_SYSTEM_MODULE_I, 1), x: -1, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.RADAR_MODULE_I, 1), x: 0, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.SHIP_PLATING_MODULE_I, 1), x: 1, y : 1}
                    ],
          stats : {
            [ObjectInterfaces.ShipStatTypeEnum.acceleration] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.armor] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.avoidance_systems] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.cargo_hold] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.energy_grid] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.gravity_radar_range] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.hull] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.max_speed] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.shield] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.shield_generation] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.targeting_systems] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.thrust] : 0,
            [ObjectInterfaces.ShipStatTypeEnum.mass] : 0
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
        module => module.module.stats.forEach(
          moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
        )
      );

      newShip.stats[ObjectInterfaces.ShipStatTypeEnum.hull] = newShip.stats[ObjectInterfaces.ShipStatTypeEnum.mass]; //TODO
      newShip.stats[ObjectInterfaces.ShipStatTypeEnum.max_speed] = 1000;
      newShip.stats[ObjectInterfaces.ShipStatTypeEnum.acceleration] = 
        newShip.stats[ObjectInterfaces.ShipStatTypeEnum.thrust] / newShip.stats[ObjectInterfaces.ShipStatTypeEnum.mass];

      newShip.properties.currentArmor = newShip.stats[ObjectInterfaces.ShipStatTypeEnum.armor];
      newShip.properties.currentShield = newShip.stats[ObjectInterfaces.ShipStatTypeEnum.shield];
      newShip.properties.currentHull = newShip.stats[ObjectInterfaces.ShipStatTypeEnum.hull];
      return newShip;
    }

}