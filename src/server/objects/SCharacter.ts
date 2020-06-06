import { ICharacter } from "../../shared/interfaces/ICharacter";
import { IUserDocument } from "../database/models/user.model";
import { Items } from "../../shared/scripts/Items";
import { ItemFactory } from "../ItemFactory";
import { ICargo } from "../../shared/interfaces/ICargo";
import { Stats } from "../../shared/stats/Stats";
import { Events } from "../../shared/scripts/Events";
import { Skills } from "../../shared/skills/Skills";
import { performance } from 'perf_hooks'
import { IdHandler } from "../IdHandler"
import { Sector } from "../Sector";

export class SCharacter {

    private character: ICharacter;
    private lastSkillProgressUpdateTime: number = -1;
    private progressTime: number = 0;

    public static createNewCharacter(user: IUserDocument, location: string) : SCharacter {
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

        let stats : Array<number> = new Array();
        Object.values(Stats.EStatType).forEach(a => stats.push(0));

        let skills : Array<Skills.ISkill> = new Array();
        skills.push({level: 1, skillType: Stats.EStatType.max_nr_of_modules, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.acceleration, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.max_speed, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.thrust, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.power, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.hull, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.armor, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.shield, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.radar_range, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.shield_generation, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.armor_impact_resistance, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.armor_heat_resistance, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.armor_explosion_resistance, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.target_dodge_reduction, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.cargo_hold, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.dodge, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.radar_signature_reduction, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.weapon_range, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.explosive_dps, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.impact_dps, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.heat_dps, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.normal_dps, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.mining_laser_strength, progress: 0});
        skills.push({level: 1, skillType: Stats.EStatType.mining_laser_range, progress: 0});

        //let ship: SShip = SShip.createNewShip();
        let character : ICharacter = {
            cargo: cargo,
            name: user.username + " (Character1)",
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
              isWarping : false,
              warpDestination : [0, 0],
              warpSource : [0, 0],
              targetId : -1,
              destVec : [0, 0],
              velVec : [0, 0]
            },
            sectorCoords: {
              x: 0, 
              y: 0
            },
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

        for(let i = 0; i < character.modules.length; i++) {
          let mod = character.modules[i].moduleItem;
          if(mod.itemType == Items.EModuleItemType.MINING_LASER_MODULE) {
            character.state.hasMiningLaser = true;
          }
    
          if(mod.itemType == Items.EModuleItemType.TURRET_MODULE ||
              mod.itemType == Items.EModuleItemType.LASER_MODULE ||
              mod.itemType == Items.EModuleItemType.RAIL_GUN_MODULE ||
              mod.itemType == Items.EModuleItemType.MINING_LASER_MODULE) {
                character.state.hasWeapon = true;
              }
        }
        
        return new SCharacter(character);
    }

    public static createCharacter(character: ICharacter) : SCharacter {
        return new SCharacter(character);
    }

    private constructor(character: ICharacter) {
        this.character = character;
        this.lastSkillProgressUpdateTime = new Date().getMilliseconds();
        this.updateStats();
    }

    public getData() : ICharacter {
        return this.character;
    }

    public update(): void {
      this.updateSkillProgress();
    }

    public updateSkillProgress() : void {
        let currentlyTraining : number = this.character.skills.currentlyTrainingIndex;
        if(currentlyTraining != -1) {
            let skill : Skills.ISkill = this.character.skills.skillList[currentlyTraining];
            this.increaseSkillProgress(skill);
            this.character.skills.skillList[currentlyTraining] = skill;
        }
    }

    private increaseSkillProgress(skill: Skills.ISkill) {
        skill.progress = skill.progress + this.getProgressTime();
        let skillInfo = Skills.getSkillInfo(skill.skillType);
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

    private upgradeSkillLevel(skill: Skills.ISkill, skillInfo: Skills.ISkillInfo) {
        skill.level = skill.level + 1;
        skill.progress = 0;
        if(skill.level > skillInfo.maxLevel) {
            skill.level = skillInfo.maxLevel;
        }

        this.stopTrainSkill();
    }

    public startTrainSkill(event: Events.TRAIN_SKILL_START_CONFIG) {
      if(this.character.skills.skillList[event.data.skillIndex] != undefined ) {
          let skill : Skills.ISkill = this.character.skills.skillList[event.data.skillIndex];
          let skillInfo = Skills.getSkillInfo(skill.skillType);
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

    private updateStats(): void {
      this.applyShipModuleStats();
      this.applySkillStats();
  }

  private applyShipModuleStats(): void {
    this.character.modules.forEach(
      //@ts-ignore
      module => module.moduleItem.module.stats.forEach(
        moduleProp => this.character.stats[moduleProp.property] = this.character.stats[moduleProp.property] + moduleProp.value
      )
    );

    this.character.stats[Stats.EStatType.max_speed] = 1000;
    this.character.stats[Stats.EStatType.acceleration] = this.character.stats[Stats.EStatType.thrust] / this.character.stats[Stats.EStatType.mass]; 
    this.character.stats[Stats.EStatType.weapon_range] = 2000; //TODO average of all weapon modules
  

    this.character.properties.currentArmor = this.character.stats[Stats.EStatType.armor];
    this.character.properties.currentShield = this.character.stats[Stats.EStatType.shield];
    this.character.properties.currentHull = this.character.stats[Stats.EStatType.hull];
  }

  private applySkillStats() {
    let skillList : Array<Skills.ISkill> = this.character.skills.skillList;
    skillList.forEach(skill => {
        let skillInfo: Skills.ISkillInfo = Skills.getSkillInfo(skill.skillType);
        let baseStat: number = this.character.stats[skillInfo.stats.stat];
        this.character.stats[skillInfo.stats.stat] = Math.floor(baseStat + Stats.getAddedValue(baseStat, skillInfo.stats.modifier, skillInfo.stats.values[skill.level - 1]));
    });
  }

  public resetState() {
    this.character.state.isMoving = false;
    this.character.state.isWarping = false;
    this.character.state.meters_per_second = 0;
    this.character.state.targetId = -1;
    this.character.state.warpDestination = [0, 0];
    this.character.state.warpSource = [0, 0];
    this.character.state.destVec = [0, 0];
    this.character.state.velVec = [0, 0];
    this.character.state.isWarping = false;
    this.character.state.isMining = false;
  }

  public stopAttack() {
      this.character.state.isAttacking = false;
  }

  public startAttack(targetId : number) {
      if(targetId != undefined && targetId > 0) {
          this.character.state.isAttacking = true;
          this.character.state.targetId = targetId;
      }
  }

  public stopMining() {
      this.character.state.isMining = false;
  }

  public startMining(targetId : number) {
      if(targetId != undefined && targetId > 0) {
          this.character.state.isMining = true;
          this.character.state.targetId = targetId;
      }
  }

  public newDestination(x: number, y: number) {
      let xLength = this.character.x - x;
      let yLength = this.character.y - y;
      let length = Math.sqrt(xLength * xLength + yLength * yLength);
      if(length != 0) {
          this.character.state.isMoving = true;
          this.character.state.destVec = [x, y];
          this.character.state.hasDestination = true;
      } 
  }

  public stopMove() {
      this.character.state.hasDestination = false;
  }

  public startWarp(sector: Sector) {
          this.character.state.isWarping = true;
          this.character.state.warpDestination = [sector.getX(), sector.getY()];
          this.character.state.warpSource = [this.character.x, this.character.y];
          this.character.state.hasDestination = false;   
  }
}