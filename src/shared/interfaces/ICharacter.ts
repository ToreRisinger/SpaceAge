import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { ICargo } from "./ICargo";
import { Skills } from "../skills/Skills";

export interface ICharacter extends ObjectInterfaces.IGameObject {
    name: string,
    cargo: ICargo,
    location: string,
    sectorCoords: {
        x: number,
        y: number
    },
    skills: {
        skillList : Array<Skills.ISkill>
        currentlyTrainingIndex: number
    }
    stats : Array<number>,
    properties : {
        currentArmor: number,
        currentHull : number,
        currentShield : number
    },
    state: {
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
    },
    modules : Array<ObjectInterfaces.IShipModuleInstance>
}