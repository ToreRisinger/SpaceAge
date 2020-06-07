import { SCharacter } from "./objects/SCharacter";
import { Stats } from "../shared/stats/Stats";
import { ComManager } from "./ComManager";
import { ICombatLogMessage } from "../shared/interfaces/ICombatLogMessage";

export module DamageService {

    let comManager: ComManager;

    export function init(_comManager: ComManager) {
        comManager = _comManager;
    }

    export function attackShip(attacking: SCharacter, target: SCharacter) {
        let totalDamage = 0;
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[Stats.EStatType.normal_dps], Stats.EDamageType.NORMAL_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[Stats.EStatType.explosive_dps], Stats.EDamageType.EXPLOSIVE_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[Stats.EStatType.heat_dps], Stats.EDamageType.HEAT_DAMAGE);
        totalDamage += dealDamageToShip(attacking, target, attacking.getData().stats[Stats.EStatType.impact_dps], Stats.EDamageType.IMPACT_DAMAGE);
        addCombatLogMessage(attacking, target, totalDamage);
    }

    function dealDamageToShip(attacking: SCharacter, target: SCharacter, damage : number, damageType : Stats.EDamageType): number {
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

    function getDamageTypeResist(character: SCharacter, damageType : Stats.EDamageType) : number {
        let resist : number = 0;
        let mass = character.getData().stats[Stats.EStatType.mass]
        switch(damageType) {
            case Stats.EDamageType.NORMAL_DAMAGE :
            resist = 1;
            break;
            case Stats.EDamageType.EXPLOSIVE_DAMAGE :
            let explosiveResistRating = character.getData().stats[Stats.EStatType.armor_explosion_resistance];
            resist = 1 - Math.log((explosiveResistRating/(mass/0.01)+1));
            break;
            case Stats.EDamageType.HEAT_DAMAGE :
            let heatResistRating = character.getData().stats[Stats.EStatType.armor_heat_resistance];
            resist = 1 - Math.log((heatResistRating/(mass/0.01)+1));
            break;
            case Stats.EDamageType.IMPACT_DAMAGE :
            let impactResistRating = character.getData().stats[Stats.EStatType.armor_impact_resistance];
            resist = 1 - Math.log((impactResistRating/(mass/0.01)+1));
            break;  
        }
        return resist;
    }

    function addCombatLogMessage(attacking: SCharacter, target: SCharacter, totalDamage: number) {
        let message : ICombatLogMessage = {
            attacker: attacking.getData().name,
            target: target.getData().name,
            damage: totalDamage
        }
        comManager.addCombatLogMessage(attacking, target, message);
    }
}