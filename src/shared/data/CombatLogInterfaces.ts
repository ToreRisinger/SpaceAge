
export enum ICombatLogMessageType {
    DAMAGE_RECEIVED,
    DAMAGE_DEALT,
    MISS_DEALT,
    MISS_RECEIVED,
    ASTROID_MINED
}


export interface ICombatLogMessage {
    type: ICombatLogMessageType
}

export interface ICombatLogDamageReceivedMessage extends ICombatLogMessage {
    attacker: string,
    damage: number
}

export interface ICombatLogDamageDealtMessage extends ICombatLogMessage {
    target: string,
    damage: number
}

export interface ICombatLogMissReceivedMessage extends ICombatLogMessage {
    attacker: string
}

export interface ICombatLogMissDealtMessage extends ICombatLogMessage {
    target: string
}

export interface ICombatLogAstroidMiningMessage extends ICombatLogMessage {
    targetAstroid: string,
    amount: number
}