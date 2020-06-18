export interface ICharacterState {
    meters_per_second: number
    isMoving : boolean,
    hasDestination : boolean,
    isAttacking : boolean,
    isMining : boolean,
    hasWeapon : boolean,
    hasMiningLaser : boolean,
    isWarping : boolean,
    warpDestination : Array<number>,
    warpSource : Array<number>,
    targetId : number,
    destVec : Array<number>
    velVec : Array<number>
}