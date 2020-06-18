import { SCharacter } from "./objects/SCharacter";
import { Utils } from "../shared/util/Utils";
import { CombatLogManager } from "./CombatLogManager";
import { EStatType } from "../shared/data/stats/EStatType";
import { StatInfo } from "../shared/data/stats/StatInfo";
import { EDamageType } from "../shared/data/stats/EDamageType";

export module DamageService {

    export function attackShip(attacking: SCharacter, target: SCharacter) {
        let dodgeChance = target.getData().stats[EStatType.dodge];
        let dodgeReduction = 1 - StatInfo.getRatingToPercentage(attacking.getData().stats[EStatType.target_dodge_reduction], attacking.getData().stats[EStatType.mass]);
        let calculatedDodgeChance = dodgeChance * dodgeReduction;
        if(Utils.getRandomNumber(1, 100) <= calculatedDodgeChance * 100) {
            CombatLogManager.addCombatLogMissMessage(attacking, target);
            return;
        }
        let totalDamage = 0;
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[EStatType.normal_dps], EDamageType.NORMAL_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[EStatType.explosive_dps], EDamageType.EXPLOSIVE_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[EStatType.heat_dps], EDamageType.HEAT_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[EStatType.impact_dps], EDamageType.IMPACT_DAMAGE);
        CombatLogManager.addCombatLogDamageMessage(attacking, target, totalDamage);
    }

    function dealDamageToShip(attacking: SCharacter, target: SCharacter, damage : number, damageType : EDamageType): number {
        let damageLeft = damage;
        let shieldBeforeDamage = target.getData().properties.currentShield;
        let armorBeforeDamage = target.getData().properties.currentArmor;
        let hullBeforeDamage = target.getData().properties.currentHull;
        let shield = target.getData().properties.currentShield;
        let armor = target.getData().properties.currentArmor;
        let hull = target.getData().properties.currentHull;

        //Damage to shield
        if(shield - damageLeft < 0) {
            damageLeft -= shield;
            target.getData().properties.currentShield = 0;
        } else {
            target.getData().properties.currentShield -= damageLeft;
            return shieldBeforeDamage - target.getData().properties.currentShield;
        }
  
        //Damage to armor
        let damageTypeResistPercent = getDamageTypeResist(target, damageType); //example 0.98 for 2% resist
        let armorDamageAfterResist = Math.floor(damageLeft * damageTypeResistPercent);
        if(armor - armorDamageAfterResist < 0) {
            damageLeft -= Math.floor(armor / damageTypeResistPercent);
            target.getData().properties.currentArmor = 0;
        } else {
            target.getData().properties.currentArmor -= armorDamageAfterResist;
            return (shieldBeforeDamage - target.getData().properties.currentShield)
                + (armorBeforeDamage - target.getData().properties.currentArmor);
        }
  
        //Damage to hull
        if(hull - damageLeft < 0) {
            target.getData().properties.currentHull = 0;
        } else {
            target.getData().properties.currentHull -= damageLeft;
        }

        return (shieldBeforeDamage - target.getData().properties.currentShield)
                + (armorBeforeDamage - target.getData().properties.currentArmor)
                + (hullBeforeDamage - target.getData().properties.currentHull)
    }

    function getDamageTypeResist(character: SCharacter, damageType : EDamageType) : number {
        let resist : number = 0;
        let mass = character.getData().stats[EStatType.mass]
        switch(damageType) {
            case EDamageType.NORMAL_DAMAGE :
            resist = 1;
            break;
            case EDamageType.EXPLOSIVE_DAMAGE :
            let explosiveResistRating = character.getData().stats[EStatType.armor_explosion_resistance];
            resist = 1- StatInfo.getRatingToPercentage(explosiveResistRating, mass);
            break;
            case EDamageType.HEAT_DAMAGE :
            let heatResistRating = character.getData().stats[EStatType.armor_heat_resistance];
            resist = 1 - StatInfo.getRatingToPercentage(heatResistRating, mass);
            break;
            case EDamageType.IMPACT_DAMAGE :
            let impactResistRating = character.getData().stats[EStatType.armor_impact_resistance];
            resist = 1- StatInfo.getRatingToPercentage(impactResistRating, mass);
            break;  
        }
        return resist;
    }
}