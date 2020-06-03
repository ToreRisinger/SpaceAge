import { IdHandler } from "./../IdHandler";
import { ItemFactory } from "./../ItemFactory";
import { ObjectInterfaces } from "../../shared/scripts/ObjectInterfaces";
import { Items } from "./../../shared/scripts/Items";
import UserModel, { IUserDocument } from "./models/user.model";
import { Logger } from "../../shared/logger/Logger";
import CharacterModel, { ICharacterDocument } from "./models/character.model";
import { ICharacter } from "../../shared/interfaces/ICharacter";
import { ICargo } from "../../shared/interfaces/ICargo";
import { Stats } from "../../shared/stats/Stats";
import { Skills } from "../../shared/skills/Skills";

const mongoose = require('mongoose')
const dbName = 'space-age-test'
const url = 'mongodb://127.0.0.1:27017/' + dbName

export module Database {

    let db;

    export function startDb() {
      db = mongoose.connection
      db.once('open', (_: any) => {
        Logger.info('Database connected:' + url)
      })
      
      db.on('error', (err: any) => {
        Logger.error('Database connection error: ' + err)
      })

      mongoose.connect(url, {
        useUnifiedTopology : true,
        useNewUrlParser: true
      });
    }

    export function newUser(_username: string, callback : (error: string, user: IUserDocument) => void) {
      const userModel = new UserModel({username : _username});
      userModel.save(callback);
    }

    export function getUser(usernameToFind: string, callback : (error: string, users: Array<IUserDocument>) => void) : void {
      UserModel.find({username: usernameToFind}, callback);
    }

    export function getCharacters(user: IUserDocument, callback: (error: string, characters: Array<ICharacterDocument>) => void) : void {
      CharacterModel.find({user: user._id}, callback);
    }

    export function newCharacter(user: IUserDocument, location: string, callback: (error: string, character: ICharacterDocument) => void) : void {
      const model = new CharacterModel({character: createNewCharacter(user, location), user: user._id});
      model.save(callback);
    }

    export function writeCharacter(character: ICharacter, user: IUserDocument, callback: (error: string) => void) : void {
      let ship = character.ship; 
      ship.isMoving = false;
      ship.isWarping = false;
      ship.meters_per_second = 0;
      ship.targetId = -1;
      ship.warpDestination = [0, 0];
      ship.warpSource = [0, 0];
      ship.destVec = [0, 0];
      ship.velVec = [0, 0];
      ship.isWarping = false;
      ship.isMining = false;

      CharacterModel.findOneAndUpdate({user: user._id, 'character.name': character.name}, {$set:{character:character}}, callback);
    }

    export function getPlayerShipLocation(playerId : number) {
      return {
        sector_x: 0,
        sector_y: 0
      }
    }

    function createNewCharacter(user: IUserDocument, location: string) : ICharacter {
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
      

      let cargo : ICargo = {
        items : items
      }

      /*
      let skills : Map<Skills.ESkillStatType, Skills.ISkill> = new Map();
      skills.set(Skills.EStatTypeSkillExtensions.MAX_NR_OF_MODULES, {level: 1, skillType: Skills.EStatTypeSkillExtensions.MAX_NR_OF_MODULES, progress: 0});
      skills.set(Stats.EStatType.acceleration, {level: 1, skillType: Stats.EStatType.acceleration, progress: 0});
      skills.set(Stats.EStatType.max_speed, {level: 1, skillType: Stats.EStatType.max_speed, progress: 0});
      skills.set(Stats.EStatType.thrust, {level: 1, skillType: Stats.EStatType.thrust, progress: 0});
      skills.set(Stats.EStatType.power, {level: 1, skillType: Stats.EStatType.power, progress: 0});
      skills.set(Stats.EStatType.hull, {level: 1, skillType: Stats.EStatType.hull, progress: 0});
      skills.set(Stats.EStatType.armor, {level: 1, skillType: Stats.EStatType.armor, progress: 0});
      skills.set(Stats.EStatType.shield, {level: 1, skillType: Stats.EStatType.shield, progress: 0});
      skills.set(Stats.EStatType.radar_range, {level: 1, skillType: Stats.EStatType.radar_range, progress: 0});
      skills.set(Stats.EStatType.shield_generation, {level: 1, skillType: Stats.EStatType.shield_generation, progress: 0});
      skills.set(Stats.EStatType.armor_impact_resistance, {level: 1, skillType: Stats.EStatType.armor_impact_resistance, progress: 0});
      skills.set(Stats.EStatType.armor_heat_resistance, {level: 1, skillType: Stats.EStatType.armor_heat_resistance, progress: 0});
      skills.set(Stats.EStatType.armor_explosion_resistance, {level: 1, skillType: Stats.EStatType.armor_explosion_resistance, progress: 0});
      skills.set(Stats.EStatType.target_dodge_reduction, {level: 1, skillType: Stats.EStatType.target_dodge_reduction, progress: 0});
      skills.set(Stats.EStatType.cargo_hold, {level: 1, skillType: Stats.EStatType.cargo_hold, progress: 0});
      skills.set(Stats.EStatType.dodge, {level: 1, skillType: Stats.EStatType.dodge, progress: 0});
      skills.set(Stats.EStatType.radar_signature_reduction, {level: 1, skillType: Stats.EStatType.radar_signature_reduction, progress: 0});
      skills.set(Stats.EStatType.weapon_range, {level: 1, skillType: Stats.EStatType.weapon_range, progress: 0});
      skills.set(Stats.EStatType.explosive_dps, {level: 1, skillType: Stats.EStatType.explosive_dps, progress: 0});
      skills.set(Stats.EStatType.impact_dps, {level: 1, skillType: Stats.EStatType.impact_dps, progress: 0});
      skills.set(Stats.EStatType.heat_dps, {level: 1, skillType: Stats.EStatType.heat_dps, progress: 0});
      skills.set(Stats.EStatType.normal_dps, {level: 1, skillType: Stats.EStatType.normal_dps, progress: 0});
      skills.set(Stats.EStatType.mining_laser_strength, {level: 1, skillType: Stats.EStatType.mining_laser_strength, progress: 0});
      skills.set(Stats.EStatType.mining_laser_range, {level: 1, skillType: Stats.EStatType.mining_laser_range, progress: 0});
      */

      let character : ICharacter = {
          cargo: cargo,
          name: user.username + " (Character1)",
          sectorCoords: {
            x: 0, 
            y: 0
          },
          location: location,
          ship: createNewShip(),
          skills: {
            skillList: {
              [Stats.EStatType.max_nr_of_modules]: {level: 1, skillType: Stats.EStatType.max_nr_of_modules, progress: 0},
              [Stats.EStatType.acceleration]: {level: 1, skillType: Stats.EStatType.acceleration, progress: 0},
              [Stats.EStatType.max_speed]: {level: 1, skillType: Stats.EStatType.max_speed, progress: 0},
              [Stats.EStatType.thrust]: {level: 1, skillType: Stats.EStatType.thrust, progress: 0},
              [Stats.EStatType.power]: {level: 1, skillType: Stats.EStatType.power, progress: 0},
              [Stats.EStatType.hull]: {level: 1, skillType: Stats.EStatType.hull, progress: 0},
              [Stats.EStatType.armor]: {level: 1, skillType: Stats.EStatType.armor, progress: 0},
              [Stats.EStatType.shield]: {level: 1, skillType: Stats.EStatType.shield, progress: 0},
              [Stats.EStatType.radar_range]: {level: 1, skillType: Stats.EStatType.radar_range, progress: 0},
              [Stats.EStatType.shield_generation]: {level: 1, skillType: Stats.EStatType.shield_generation, progress: 0},
              [Stats.EStatType.armor_impact_resistance]: {level: 1, skillType: Stats.EStatType.armor_impact_resistance, progress: 0},
              [Stats.EStatType.armor_heat_resistance]: {level: 1, skillType: Stats.EStatType.armor_heat_resistance, progress: 0},
              [Stats.EStatType.armor_explosion_resistance]: {level: 1, skillType: Stats.EStatType.armor_explosion_resistance, progress: 0},
              [Stats.EStatType.target_dodge_reduction]: {level: 1, skillType: Stats.EStatType.target_dodge_reduction, progress: 0},
              [Stats.EStatType.cargo_hold]: {level: 1, skillType: Stats.EStatType.cargo_hold, progress: 0},
              [Stats.EStatType.dodge]: {level: 1, skillType: Stats.EStatType.dodge, progress: 0},
              [Stats.EStatType.radar_signature_reduction]: {level: 1, skillType: Stats.EStatType.radar_signature_reduction, progress: 0},
              [Stats.EStatType.weapon_range]: {level: 1, skillType: Stats.EStatType.weapon_range, progress: 0},
              [Stats.EStatType.explosive_dps]: {level: 1, skillType: Stats.EStatType.explosive_dps, progress: 0},
              [Stats.EStatType.impact_dps]: {level: 1, skillType: Stats.EStatType.impact_dps, progress: 0},
              [Stats.EStatType.heat_dps]: {level: 1, skillType: Stats.EStatType.heat_dps, progress: 0},
              [Stats.EStatType.normal_dps]: {level: 1, skillType: Stats.EStatType.normal_dps, progress: 0},
              [Stats.EStatType.mining_laser_strength]: {level: 1, skillType: Stats.EStatType.mining_laser_strength, progress: 0},
              [Stats.EStatType.mining_laser_range]: {level: 1, skillType: Stats.EStatType.mining_laser_range, progress: 0}
            },
            currentlyTraining: undefined
          }
      }
      return character;
  }

  function createNewShip() {
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

      let updatedShip = updateShipProperties(ship);

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

      return updatedShip;
  }

  function updateShipProperties(ship : ObjectInterfaces.IShip) : ObjectInterfaces.IShip {
      let newShip = ship;
      newShip.modules.forEach(
        //@ts-ignore
        module => module.moduleItem.module.stats.forEach(
          //@ts-ignore
          moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
        )
      );

      newShip.stats[Stats.EStatType.max_speed] = 1000;

      newShip.stats[Stats.EStatType.acceleration] = 
        newShip.stats[Stats.EStatType.thrust] / newShip.stats[Stats.EStatType.mass];



      //TODO weapon range average calculation  
      newShip.stats[Stats.EStatType.weapon_range] = 2000;
    

      newShip.properties.currentArmor = newShip.stats[Stats.EStatType.armor];
      newShip.properties.currentShield = newShip.stats[Stats.EStatType.shield];
      newShip.properties.currentHull = newShip.stats[Stats.EStatType.hull];
      return newShip;
    }
}