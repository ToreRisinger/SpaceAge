export interface IShipState {
    meters_per_second: number,
    isMoving : boolean,
    hasDestination : boolean,
    isAttacking : boolean,
    targetId : number,
    destVec : Array<number>,
    velVec : Array<number>,
    isMining : boolean,
    hasWeapon : boolean,
    hasMiningLaser : boolean
}