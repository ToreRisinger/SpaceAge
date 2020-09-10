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
import { EStatType } from "../../shared/data/stats/EStatType";
import { ISkill } from "../../shared/data/skills/ISkill";
import { StatInfo } from "../../shared/data/stats/StatInfo";
import { SShip } from "./SShip";
import { CargoUtils } from "../CargoUtils";
import { CombatLogManager } from "../CombatLogManager";
import { GameConstants } from "../../shared/constants/GameConstants";
import { MineralInfo } from "../../shared/data/item/MineralInfo";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { ERefinedMineralItemType } from "../../shared/data/item/ERefinedMineralItemType";
import { ShipModuleInfo } from "../../shared/data/shipmodule/ShipModuleInfo";

const math = require('mathjs');

export class SCharacter extends SShip {
  
    private character: ICharacter;
    private lastSkillProgressUpdateTime: number = -1;
    private progressTime: number = 0;

    public static createNewCharacter(user: IUserDocument, characterName: string, location: string) : SCharacter {
        let items : Array<IItem> = new Array(); 
        items.push(ItemFactory.createModule(EModuleItemType.SHIELD_MODULE, 1));
        items.push(ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 2));
        items.push(ItemFactory.createModule(EModuleItemType.MAIN_MODULE, 3));
        items.push(ItemFactory.createModule(EModuleItemType.SHIELD_GENERATION_MODULE, 4));
        items.push(ItemFactory.createModule(EModuleItemType.POWER_MODULE, 5));
        items.push(ItemFactory.createItem(ERefinedMineralItemType.REFINED_IRON, 50));
        items.push(ItemFactory.createItem(ERefinedMineralItemType.REFINED_GOLD, 50));
        items.push(ItemFactory.createItem(ERefinedMineralItemType.REFINED_PLATINUM, 50));
        items.push(ItemFactory.createItem(ERefinedMineralItemType.REFINED_SILVER, 50));
  
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
        skills.push({level: 0, skillType: EStatType.cargo_hold_size, progress: 0});
        skills.push({level: 0, skillType: EStatType.dodge, progress: 0});
        skills.push({level: 0, skillType: EStatType.radar_signature_reduction, progress: 0});
        skills.push({level: 0, skillType: EStatType.weapon_range, progress: 0});
        skills.push({level: 0, skillType: EStatType.weapon_damage, progress: 0});
        skills.push({level: 0, skillType: EStatType.mining_laser_yield, progress: 0});
        skills.push({level: 0, skillType: EStatType.mining_laser_range, progress: 0});
        skills.push({level: 0, skillType: EStatType.main_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.thrust_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.power_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.cargo_hold_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.armor_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.shield_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.shield_generation_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.radar_range_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.weapon_range_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.support_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.mining_laser_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.turret_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.target_dodge_reduction_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.radar_signature_reduction_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.factory_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.refinary_module_quality, progress: 0});
        skills.push({level: 0, skillType: EStatType.refining_skill, progress: 0});
        skills.push({level: 0, skillType: EStatType.manufactoring_skill, progress: 0});
        skills.push({level: 0, skillType: EStatType.hull_repair_cost, progress: 0});
        skills.push({level: 0, skillType: EStatType.hull_repair_speed, progress: 0});
        skills.push({level: 0, skillType: EStatType.armor_repair_cost, progress: 0});
        skills.push({level: 0, skillType: EStatType.armor_repair_speed, progress: 0});

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
              targetId : -1,
              destVec : [0, 0],
              velVec : [0, 0]
            },
            warpState: {
              isWarping : false,
              toSectorId : 0,
              fromSectorId : 0,
            },
            dockingState: {
              isDocking: false,
              isDocked: false
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
            oreProcessingState: {
              isProcessing: false,
              item: undefined,
              startTime: 0
            },
            manufactruingState: {
              isManufacturing: false,
              module: undefined,
              startTime: 0
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
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 2, y : 1},
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 3, y : 2},
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 4, y : 3},
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 5, y : 4},
              {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 6, y : 5},
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
      this.updateSkillProgress();
    }

    public update1000ms(sector: SSector): void {
      super.update1000ms(sector);
      this.handleMiningShip(sector);
      this.handleOreProcessing();
      this.handleManufacturing();
    }

    public resetState() {
      super.resetState();
      this.character.warpState.toSectorId = 0;
      this.character.warpState.fromSectorId = 0;
      this.character.warpState.isWarping = false;
    }

    public startTrainSkill(event: Events.TRAIN_SKILL_START_CONFIG) {
      let skill : ISkill = this.character.skills.skillList[event.data.skillIndex];
      if(skill != undefined ) {
          let skillInfo = SkillInfo.getSkillInfo(skill.skillType);
          if(skill.level < skillInfo.maxLevel || skillInfo.maxLevel == -1) {
              this.character.skills.currentlyTrainingIndex = event.data.skillIndex;
          }
          this.lastSkillProgressUpdateTime = performance.now();
          this.progressTime = 0;
      }
    }

    public stopTrainSkill() {
        this.character.skills.currentlyTrainingIndex = -1;
    }

    public startBuildModule(event: Events.BUILD_MODULE_START) {
      let moduleInfo : ShipModuleInfo.IShipModuleInfo = ShipModuleInfo.getModuleInfo(event.data.moduleType);

      if(!this.character.manufactruingState.isManufacturing) {
        if(this.hasEnoughMinerals(moduleInfo, event.data.quality)) {
          moduleInfo.minerals.forEach(element => {
            let amount = element.base + element.increase * (event.data.quality - 1);
            CargoUtils.removeType(this, element.mineral, amount);
          });
          
          this.character.manufactruingState.isManufacturing = true;
          this.character.manufactruingState.module = {
            moduleType: event.data.moduleType,
            quality: event.data.quality
          }
          this.character.manufactruingState.startTime = Date.now();
        }
      }
    }

    private hasEnoughMinerals(moduleInfo : ShipModuleInfo.IShipModuleInfo, quality: number): boolean {
      let resourceMap : Map<ERefinedMineralItemType, number> = new Map();
      resourceMap.set(ERefinedMineralItemType.REFINED_GOLD, 0);
      resourceMap.set(ERefinedMineralItemType.REFINED_IRON, 0);
      resourceMap.set(ERefinedMineralItemType.REFINED_PLATINUM, 0);
      resourceMap.set(ERefinedMineralItemType.REFINED_SILVER, 0);
      this.character.cargo.items.forEach(item => {
          switch(item.itemType) {
              case ERefinedMineralItemType.REFINED_GOLD:
                  //@ts-ignore
                  resourceMap.set(ERefinedMineralItemType.REFINED_GOLD, resourceMap.get(ERefinedMineralItemType.REFINED_GOLD) + item.quantity);
                  break;
              case ERefinedMineralItemType.REFINED_IRON:
                  //@ts-ignore
                  resourceMap.set(ERefinedMineralItemType.REFINED_IRON, resourceMap.get(ERefinedMineralItemType.REFINED_IRON) + item.quantity);
                  break;
              case ERefinedMineralItemType.REFINED_PLATINUM:
                  //@ts-ignore
                  resourceMap.set(ERefinedMineralItemType.REFINED_PLATINUM, resourceMap.get(ERefinedMineralItemType.REFINED_PLATINUM) + item.quantity);
                  break;
              case ERefinedMineralItemType.REFINED_SILVER:
                  //@ts-ignore
                  resourceMap.set(ERefinedMineralItemType.REFINED_SILVER, resourceMap.get(ERefinedMineralItemType.REFINED_SILVER) + item.quantity);
                  break;
              default:
                  break;
          }
      });

      moduleInfo.minerals.forEach(element => {
        let amount = element.base + element.increase * (quality - 1);
        let enoughQuantityTmp = this.haveEnoughQuantity(resourceMap, element.mineral, amount);
        if(!enoughQuantityTmp) {
            return false;
        }
      });

      return true;
    }

    private haveEnoughQuantity(resourceMap : Map<ERefinedMineralItemType, number>, mineral: ERefinedMineralItemType, amount: number) {
      //@ts-ignore
      return resourceMap.get(mineral) == undefined ? false : resourceMap.get(mineral) >= amount;
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
        const maxProgress = skillInfo.startLearningTime * (Math.pow(skillInfo.learningTimeIncrease, skill.level));
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
        if(skillInfo.maxLevel != -1 && skill.level > skillInfo.maxLevel) {
            skill.level = skillInfo.maxLevel;
        }

        this.stopTrainSkill();
        this.updateCharacterStats();
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
          this.character.stats[skillInfo.stats.stat] = Math.floor(baseStat + StatInfo.getAddedValue(baseStat, skillInfo.stats.modifier, skillInfo.stats.baseValue + skillInfo.stats.increase * skill.level));
        });
    }

    private handleMiningShip(sector: SSector) {
      if(!this.character.state.isMining) {
        return;
      }

      let character = this.character
      let targetAsteroid = sector.getAsteroids().get(character.state.targetId);
      if(targetAsteroid != undefined) {
        let miningShipPos = [character.x, character.y];
        let asteroidPos = [targetAsteroid.x, targetAsteroid.y];
        let miningShipToAsteroidVec = math.subtract(miningShipPos, asteroidPos);
        let miningShipToAsteroidDistance : number = math.length(miningShipToAsteroidVec);
        let miningShipMiningRange = character.stats[EStatType.mining_laser_range];
        if(miningShipToAsteroidDistance <= miningShipMiningRange) {
          let sizeMined = character.stats[EStatType.mining_laser_yield];

          let success: boolean = true;
          if(targetAsteroid.size >= sizeMined) {
              success = CargoUtils.addItemToPlayerCargo(ItemFactory.createItem(targetAsteroid.type, sizeMined), this);
              if(success) {
                targetAsteroid.size = targetAsteroid.size - sizeMined;
              }
              
          } else {
              success = CargoUtils.addItemToPlayerCargo(ItemFactory.createItem(targetAsteroid.type, targetAsteroid.size), this);
              if(success) {
                targetAsteroid.size = 0;
              }
          }

          if(success) {
            CombatLogManager.addCombatLogAstroidMinedMessage(this, targetAsteroid, sizeMined);
          }
          //TODO send cargo full
        } 
      }
  }

  public newDestination(x: number, y: number) {
    if(!this.character.warpState.isWarping) {
      this.character.dockingState.isDocking = false;
      super.newDestination(x, y);
    }
  }

  public startDocking(x: number, y: number) {
    if(!this.character.warpState.isWarping) {
      this.character.dockingState.isDocking = true;
      super.newDestination(x, y);
    }
  }

  public startWarping(x: number, y: number, toSectorId: number, fromSectorId: number) {
    this.character.warpState.toSectorId = toSectorId;
    this.character.warpState.fromSectorId = fromSectorId;
    this.character.warpState.isWarping = true;
    this.character.dockingState.isDocking = false;
    super.newDestination(x, y);
  }

  public stopMove() {
    if(!this.character.warpState.isWarping) {
      super.stopMove();
      this.character.dockingState.isDocking = false;
    }
  }
  
  private handleOreProcessing() {
    if(!this.character.oreProcessingState.isProcessing) {
      return;
    }

    if(this.character.oreProcessingState.item == undefined || !(this.character.oreProcessingState.item.itemType in EMineralItemType)) {
      this.character.oreProcessingState.isProcessing = false;
      return;
    }

    //@ts-ignore
    let mineralInfo = MineralInfo.getMineralInfo(this.character.oreProcessingState.item.itemType);

    if(this.character.oreProcessingState.item.quantity >= mineralInfo.refineQuantity) {
      let totalTime = GameConstants.ORE_PROCESSING_BASE_TIME * (1 - this.character.stats[EStatType.ore_processing_speed]) * 1000;
      let timePassed = Date.now() - this.character.oreProcessingState.startTime;
      let shouldResetStartTime = timePassed > totalTime;

      timePassed - totalTime;
      while(timePassed > totalTime) {
        this.character.oreProcessingState.item.quantity = this.character.oreProcessingState.item.quantity - mineralInfo.refineQuantity;
        let refined: IItem = {
          //@ts-ignore
          itemType: mineralInfo.refined,
          module: undefined,
          quantity: 1
        };
        CargoUtils.addItemToPlayerCargo(refined, this);
        timePassed = timePassed - totalTime;

        if(this.character.oreProcessingState.item.quantity < mineralInfo.refineQuantity) {
          if(this.character.oreProcessingState.item.quantity == 0) {
            this.character.oreProcessingState.item = undefined;
            this.character.oreProcessingState.isProcessing = false;
          }
          return;
        }
      }
      if(shouldResetStartTime) {
        this.character.oreProcessingState.startTime = Date.now();
      }
    }
  }

  private handleManufacturing() {
    if(!this.character.manufactruingState.isManufacturing) {
      return;
    }

    let totalTime = GameConstants.MANUFACURING_BASE_TIME * (1 - this.character.stats[EStatType.manufactoring_speed]) * 1000;
    let timePassed = Date.now() - this.character.manufactruingState.startTime;
    if(timePassed > totalTime) {
      //@ts-ignore
      let item: IItem = ItemFactory.createModule(this.character.manufactruingState.module.moduleType, this.character.manufactruingState.module.quality);
      CargoUtils.addItemToPlayerCargo(item, this);

      this.character.manufactruingState.isManufacturing = false;
      this.character.manufactruingState.module = undefined;
    }
  }

  protected getAcceleration(): number {
    return this.getData().warpState.isWarping ? 100000 : this.getData().stats[EStatType.acceleration];
  }

  protected getMaxSpeed(): number {
    return this.getData().warpState.isWarping ? 100000000 : this.getData().stats[EStatType.max_speed];
  }
}