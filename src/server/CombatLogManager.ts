import { ComManager } from "./ComManager";
import { ICombatLogMessageType, ICombatLogAstroidMiningMessage, ICombatLogDamageDealtMessage, ICombatLogDamageReceivedMessage, ICombatLogMissDealtMessage, ICombatLogMissReceivedMessage } from "../shared/interfaces/CombatLogInterfaces";
import { SCharacter } from "./objects/SCharacter";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { Items } from "../shared/scripts/Items";

export module CombatLogManager {
    
    let comManager: ComManager;

    export function init(_comManager: ComManager) {
        comManager = _comManager;
    }

    export function addCombatLogDamageMessage(attacking: SCharacter, target: SCharacter, totalDamage: number) {
        let messageOne : ICombatLogDamageDealtMessage = {
            type: ICombatLogMessageType.DAMAGE_DEALT,
            target: target.getData().name,
            damage: totalDamage
        }
        comManager.addCombatLogMessage(attacking, messageOne);

        let messageTwo : ICombatLogDamageReceivedMessage = {
            type: ICombatLogMessageType.DAMAGE_RECEIVED,
            attacker: attacking.getData().name,
            damage: totalDamage
        }
        comManager.addCombatLogMessage(target, messageTwo);

    }

    export function addCombatLogMissMessage(attacking: SCharacter, target: SCharacter) {
        let messageOne : ICombatLogMissDealtMessage = {
            type: ICombatLogMessageType.MISS_DEALT,
            target: target.getData().name
        }
        comManager.addCombatLogMessage(attacking, messageOne);

        let messageTwo : ICombatLogMissReceivedMessage = {
            type: ICombatLogMessageType.MISS_RECEIVED,
            attacker: target.getData().name
        }
        comManager.addCombatLogMessage(target, messageTwo);
    }

    export function addCombatLogAstroidMinedMessage(mining: SCharacter, target: AsteroidData.IAsteroid, amountMined: number) {
        let message : ICombatLogAstroidMiningMessage = {
            type: ICombatLogMessageType.ASTROID_MINED,
            targetAstroid: Items.getItemInfo(target.type).name,
            amount: amountMined
        }
        comManager.addCombatLogMessage(mining, message);
    }
}