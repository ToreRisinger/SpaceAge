import { ICharacter } from "../interfaces/ICharacter";
import { IUserDocument } from "../../server/database/models/user.model";
import { Items } from "../scripts/Items";
import { ItemFactory } from "../../server/ItemFactory";
import { ICargo } from "../interfaces/ICargo";
import { Stats } from "../stats/Stats";
import { Ship } from "./Ship";
import { InsHTMLAttributes } from "react";

export class Character {

    private character: ICharacter;
    private ship: Ship;

    public static createNewCharacter(user: IUserDocument, location: string) : Character {
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
        let ship: Ship = Ship.createNewShip();
        let character : ICharacter = {
            cargo: cargo,
            name: user.username + " (Character1)",
            sectorCoords: {
              x: 0, 
              y: 0
            },
            location: location,
            ship: ship.getData(),
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

        return new Character(character, ship);
    }

    public static createCharacter(character: ICharacter) : Character {
        return new Character(character, Ship.createShip(character.ship));
    }

    private constructor(character: ICharacter, ship: Ship) {
        this.character = character;
        this.ship = ship;
    }

    public getData() : ICharacter {
        return this.character;
    }
}