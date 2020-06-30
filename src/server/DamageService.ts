import { Utils } from "../shared/util/Utils";
import { CombatLogManager } from "./CombatLogManager";
import { EStatType } from "../shared/data/stats/EStatType";
import { StatInfo } from "../shared/data/stats/StatInfo";
import { SShip } from "./objects/SShip";

export module DamageService {

    export function attackShip(attacking: SShip, target: SShip) {
        let dodgeChance = target.getData().stats[EStatType.dodge];
        let dodgeReduction = 1 - StatInfo.getRatingToPercentage(attacking.getData().stats[EStatType.target_dodge_reduction], attacking.getData().stats[EStatType.mass]);
        let calculatedDodgeChance = dodgeChance * dodgeReduction;
        if(Utils.getRandomNumber(1, 100) <= calculatedDodgeChance * 100) {
            CombatLogManager.addCombatLogMissMessage(attacking, target);
            return;
        }
        let totalDamage = 0;
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[EStatType.weapon_damage]);
        CombatLogManager.addCombatLogDamageMessage(attacking, target, totalDamage);
    }

    function dealDamageToShip(attacking: SShip, target: SShip, damage : number): number {
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
        if(armor - damageLeft < 0) {
            damageLeft -= armor;
            target.getData().properties.currentArmor = 0;
        } else {
            target.getData().properties.currentArmor -= damageLeft;
            return (shieldBeforeDamage - target.getData().properties.currentShield)
                + (armorBeforeDamage - target.getData().properties.currentArmor);
        }
  
        //Damage to hull
        if(hull - damageLeft < 0) {
            target.getData().properties.currentHull = 0;
            target.setDestroyed(attacking.getData().id);
        } else {
            target.getData().properties.currentHull -= damageLeft;
        }

        return (shieldBeforeDamage - target.getData().properties.currentShield)
                + (armorBeforeDamage - target.getData().properties.currentArmor)
                + (hullBeforeDamage - target.getData().properties.currentHull)
    }
}