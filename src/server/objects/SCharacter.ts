import { ICharacter } from "../../shared/data/gameobject/ICharacter";
import { IUserDocument } from "../database/models/user.model";
import { ItemFactory } from "../ItemFactory";
import { ICargo } from "../../shared/data/ICargo";
import { Events } from "../../shared/util/Events";
import { SkillInfo } from "../../shared/data/skills/SkillInfo";
import { performance } from 'perf_hooks'
import { IdHandler } from "../IdHandler"
import { SSector } from "../sector/SSector";
import { IItem } from "../../shared/data/item/IItem";
import { EModuleItemType } from "../../shared/data/item/EModuleItemType";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { EStatType } from "../../shared/data/stats/EStatType";
import { ISkill } from "../../shared/data/skills/ISkill";
import { StatInfo } from "../../shared/data/stats/StatInfo";
import { SShip } from "./SShip";
import { SERVER_CONSTANTS } from "../constants/serverconstants";
import { CargoUtils } from "../CargoUtils";
import { CombatLogManager } from "../CombatLogManager";

const math = require('mathjs');

export class SCharacter extends SShip {
  
    private character: ICharacter;
    private lastSkillProgressUpdateTime: number = -1;
    private progressTime: number = 0;

    public static createNewCharacter(user: IUserDocument, characterName: string, location: string) : SCharacter {
        let items : Array<IItem> = new Array();
        items.push(ItemFactory.createMineral(EMineralItemType.DIAMOND_ORE, 1));
        items.push(ItemFactory.createMineral(EMineralItemType.GOLD_ORE, 20));
        items.push(ItemFactory.createMineral(EMineralItemType.IRON_ORE, 1));
        items.push(ItemFactory.createMineral(EMineralItemType.TITANIUM_ORE, 1));
        items.push(ItemFactory.createMineral(EMineralItemType.URANIUM_ORE, 1));
        
        items.push(ItemFactory.createModule(EModuleItemType.SHIELD_MODULE, 1));
        items.push(ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 2));
        items.push(ItemFactory.createModule(EModuleItemType.MAIN_MODULE, 3));
        items.push(ItemFactory.createModule(EModuleItemType.SHIELD_GENERATION_MODULE, 4));
        items.push(ItemFactory.createModule(EModuleItemType.POWER_MODULE, 5));
        
  
        let cargo : ICargo = {
          items : items
        }

        let stats : Array<number> = new Array();
        Object.values(EStatType).forEach(a => stats.push(0));

        let skills : Array<ISkill> = new Array();
        skills.push({level: 0, skillType: EStatType.max_nr_of_modules, progress: 0});
        skills.push({level: 0, skillType: EStatType.acceleration, progress: 0});
        skills.push({level: 0, skillType: EStatType.max_speed, progress: 0});
        skills.push({level: 0, skillType: EStatType.thrust, progress: 0});
        skills.push({level: 0, skillType: EStatType.power, progress: 0});
        skills.push({level: 0, skillType: EStatType.hull, progress: 0});
        skills.push({level: 0, skillType: EStatType.armor, progress: 0});
        skills.push({level: 0, skillType: EStatType.shield, progress: 0});
        skills.push({level: 0, skillType: EStatType.radar_range, progress: 0});
        skills.push({level: 0, skillType: EStatType.shield_generation, progress: 0});
        skills.push({level: 0, skillType: EStatType.target_dodge_reduction, progress: 0});
        skills.push({level: 0, skillType: EStatType.cargo_hold, progress: 0});
        skills.push({level: 0, skillType: EStatType.dodge, progress: 0});
        skills.push({level: 0, skillType: EStatType.radar_signature_reduction, progress: 0});
        skills.push({level: 0, skillType: EStatType.weapon_range, progress: 0});
        skills.push({level: 0, skillType: EStatType.weapon_damage, progress: 0});
        skills.push({level: 0, skillType: EStatType.mining_laser_strength, progress: 0});
        skills.push({level: 0, skillType: EStatType.mining_laser_range, progress: 0});

        skills.push({level: 1, skillType: EStatType.main_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.thrust_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.power_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.cargo_hold_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.armor_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.shield_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.shield_generation_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.radar_range_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.weapon_range_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.mining_laser_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.turret_module_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.target_dodge_reduction_quality, progress: 0});
        skills.push({level: 1, skillType: EStatType.radar_signature_reduction_module_quality, progress: 0});

        let character : ICharacter = {
            cargo: cargo,
            name: user.username + " " + characterName,
            id: IdHandler.getNewGameObjectId(),
            x : 0,
            y : 0,
            state : {
              meters_per_second: 0,
              isMoving : false,
              hasDestination : false,
              isAttacking : false,
              isMining : false,
              hasWeapon : false,
              hasMiningLaser : false,
              targetId : -1,
              destVec : [0, 0],
              velVec : [0, 0]
            },
            warpState: {
              isWarping : false,
              warpDestination : [0, 0],
              warpSource : [0, 0],
            },
            sectorId: 0,
            location: location,
            skills: {
              skillList: skills,
              currentlyTrainingIndex: -1
            },
            stats : stats,
            properties : {
              currentArmor: 0,
              currentHull : 0,
              currentShield : 0
            },
            modules : [
              {moduleItem: ItemFactory.createModule(EModuleItemType.POWER_MODULE, 1), x: -1, y : -1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.SHIELD_MODULE, 1), x: 0, y : -1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.TURRET_MODULE, 1), x: 1, y : -1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.THRUST_MODULE, 1), x: -1, y : 0},
              {moduleItem: ItemFactory.createModule(EModuleItemType.MAIN_MODULE, 1), x: 0, y : 0},
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 1, y : 0},
              {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: -1, y : 1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.RADAR_RANGE_MODULE, 1), x: 0, y : 1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.TARGET_DODGE_REDUCTION_MODULE, 1), x: 1, y : 1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: 1, y : 2},
              {moduleItem: ItemFactory.createModule(EModuleItemType.TURRET_MODULE, 1), x: 1, y : 3},
              {moduleItem: ItemFactory.createModule(EModuleItemType.TURRET_MODULE, 1), x: 1, y : 4},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 2, y : 1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 3, y : 2},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 4, y : 3},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 5, y : 4},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 6, y : 5},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 7, y : 6},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 8, y : 7},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 9, y : 8},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 10, y : 9},
              {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: 11, y : 10},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 12, y : 11},
              {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 13, y : 12}
          ],
          money: 0
        }

        for(let i = 0; i < character.modules.length; i++) {
          let mod = character.modules[i].moduleItem;
          if(mod.itemType == EModuleItemType.MINING_LASER_MODULE) {
            character.state.hasMiningLaser = true;
          }
    
          if(mod.itemType == EModuleItemType.TURRET_MODULE || mod.itemType == EModuleItemType.MINING_LASER_MODULE) {
                character.state.hasWeapon = true;
              }
        }
        
        return new SCharacter(character);
    }

    public static createCharacter(character: ICharacter) : SCharacter {
        character.id = IdHandler.getNewGameObjectId();
        return new SCharacter(character);
    }

    private constructor(character: ICharacter) {
        super(character, true);
        this.character = character;
        this.lastSkillProgressUpdateTime = performance.now();
        this.updateCharacterStats();
    }

    public getData() : ICharacter {
        return this.character;
    }

    public update40ms(sector: SSector): void {
      super.update40ms(sector);
      this.updateWarpingShipPosition();
      this.updateSkillProgress();
    }

    public update1000ms(sector: SSector): void {
      super.update1000ms(sector);
      this.handleMiningShip(sector);
    }

    public resetState() {
      super.resetState();
      this.character.warpState.warpDestination = [0, 0];
      this.character.warpState.warpSource = [0, 0];
      this.character.warpState.isWarping = false;
    }

    public startWarp(sector: SSector) {
        this.character.warpState.isWarping = true;
        this.character.warpState.warpDestination = [sector.getX(), sector.getY()];
        this.character.warpState.warpSource = [this.character.x, this.character.y];
        this.character.state.hasDestination = false;   
    }

    public startTrainSkill(event: Events.TRAIN_SKILL_START_CONFIG) {
      if(this.character.skills.skillList[event.data.skillIndex] != undefined ) {
          let skill : ISkill = this.character.skills.skillList[event.data.skillIndex];
          let skillInfo = SkillInfo.getSkillInfo(skill.skillType);
          if(skill.level < skillInfo.maxLevel) {
              this.character.skills.currentlyTrainingIndex = event.data.skillIndex;
          }
          this.lastSkillProgressUpdateTime = performance.now();
          this.progressTime = 0;
      }
    }

    public stopTrainSkill() {
        this.character.skills.currentlyTrainingIndex = -1;
    }

    private updateSkillProgress() : void {
        let currentlyTraining : number = this.character.skills.currentlyTrainingIndex;
        if(currentlyTraining != -1) {
            let skill : ISkill = this.character.skills.skillList[currentlyTraining];
            this.increaseSkillProgress(skill);
            this.character.skills.skillList[currentlyTraining] = skill;
        }
    }

    private increaseSkillProgress(skill: ISkill) {
        skill.progress = skill.progress + this.getProgressTime();
        let skillInfo = SkillInfo.getSkillInfo(skill.skillType);
        const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, skill.level - 1));
        if(skill.progress >= maxProgress) {
            this.upgradeSkillLevel(skill, skillInfo);
        }
    }

    private getProgressTime() : number {
        let now = performance.now();
        this.progressTime += (now - this.lastSkillProgressUpdateTime);
        let seconds = 0;
        if(this.progressTime > 1000) {
          seconds = this.progressTime / 1000;
          this.progressTime = this.progressTime - seconds * 1000;
        }
        this.lastSkillProgressUpdateTime = now;
        return seconds;
    }

    private upgradeSkillLevel(skill: ISkill, skillInfo: SkillInfo.ISkillInfo) {
        skill.level = skill.level + 1;
        skill.progress = 0;
        if(skill.level > skillInfo.maxLevel) {
            skill.level = skillInfo.maxLevel;
        }

        this.stopTrainSkill();
    }

    private updateCharacterStats(): void {
      this.resetStats();
      this.applyShipModuleStats();
      this.applySkillStats();
      this.calculateStats();
    }

    private resetStats() {
        for(let i = 0; i < this.character.stats.length; i++) {
          this.character.stats[i] = 0;
        }
    }

    private applySkillStats() {
      let skillList : Array<ISkill> = this.character.skills.skillList;
      skillList.forEach(skill => {
          let skillInfo: SkillInfo.ISkillInfo = SkillInfo.getSkillInfo(skill.skillType);
          let baseStat: number = this.character.stats[skillInfo.stats.stat];
          this.character.stats[skillInfo.stats.stat] = Math.floor(baseStat + StatInfo.getAddedValue(baseStat, skillInfo.stats.modifier, skillInfo.stats.values[skill.level]));
      });
    }   

    private updateWarpingShipPosition() {
      let characterData: ICharacter = this.getData();
      if(!characterData.warpState.isWarping) {
        return;
      }

      let x = this.getData().x;
      let y = this.getData().y;
      
      let totalLength = math.length(math.subtract(characterData.warpState.warpDestination,[x + characterData.warpState.warpSource[0], y + characterData.warpState.warpSource[1]]));
      let distanceTraveled = math.length(
                                math.subtract([x + characterData.warpState.warpSource[0], y + characterData.warpState.warpSource[1]], 
                                  [x + characterData.x, y + characterData.y]));;
      let shipToDest = math.subtract(characterData.warpState.warpDestination, [x + characterData.x, y + characterData.y]);
      
      let speed = 1000000;
      let ratio = distanceTraveled / totalLength;
      let acceleration = 1 + ratio * speed;
      let velVec = math.multiply(math.multiply(shipToDest, 1/math.length(shipToDest)), acceleration);

      characterData.x = characterData.x + velVec[0];
      characterData.y = characterData.y + velVec[1];
      characterData.state.meters_per_second = math.length(velVec) / SERVER_CONSTANTS.UPDATES_PER_SECOND
    }

    private handleMiningShip(sector: SSector) {
      if(!this.character.state.isMining) {
        return;
      }

      let character = this.character
      let targetAsteroid = sector.getAsteroids().get(character.state.targetId);
      let cargoSpaceLeft = character.stats[EStatType.cargo_hold] - CargoUtils.getCargoSize(this);
      if(targetAsteroid != undefined && cargoSpaceLeft > 0) {
        let miningShipPos = [character.x, character.y];
        let asteroidPos = [targetAsteroid.x, targetAsteroid.y];
        let miningShipToAsteroidVec = math.subtract(miningShipPos, asteroidPos);
        let miningShipToAsteroidDistance : number = math.length(miningShipToAsteroidVec);
        let miningShipMiningRange = character.stats[EStatType.mining_laser_range];
        if(miningShipToAsteroidDistance <= miningShipMiningRange) {
          let sizeMined = Math.floor(character.stats[EStatType.mining_laser_strength] / targetAsteroid.hardness);
          if(sizeMined == 0) {
              sizeMined = 1;
          }

          if(sizeMined > cargoSpaceLeft) {
              sizeMined = cargoSpaceLeft;
          }

          if(targetAsteroid.size >= sizeMined) {
              CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, sizeMined), this);
              targetAsteroid.size = targetAsteroid.size - sizeMined;
          } else {
              CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, targetAsteroid.size), this);
              targetAsteroid.size = 0;
          }

          CombatLogManager.addCombatLogAstroidMinedMessage(this, targetAsteroid, sizeMined);
        } 
      }
  }
}