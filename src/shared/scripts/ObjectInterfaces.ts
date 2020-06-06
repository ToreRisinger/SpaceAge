import { Items } from "./Items";

export module ObjectInterfaces {

    export interface IIdentifiableObject {
        id : number,
    }

    export interface IGameObject extends IIdentifiableObject {
        x : number,
        y : number
    }

    export interface IShipModuleInstance {
        moduleItem: Items.IItem, 
        x : number, 
        y : number
    }

    export interface IShip extends IGameObject {
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
        modules : Array<IShipModuleInstance>
    }
}