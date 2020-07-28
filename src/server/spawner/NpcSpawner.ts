import { SSector } from "../sector/SSector";
import { Spawner } from "./Spawner";
import { ENpcType } from "../../shared/data/npc/ENpcType";
import { Utils } from "../../shared/util/Utils";
import { INpc } from "../../shared/data/npc/INpc";
import { IdHandler } from "../IdHandler";
import { EStatType } from "../../shared/data/stats/EStatType";
import { ItemFactory } from "../ItemFactory";
import { EModuleItemType } from "../../shared/data/item/EModuleItemType";
import { SNpc } from "../objects/npc/SNpc";
import { NpcInfo } from "../../shared/data/npc/NpcInfo";
import { ISceneObject } from "../../shared/data/gameobject/ISceneObject";
import { ESceneObjectType } from "../../shared/data/sceneobjects/ESceneObjectType";

export class NpcSpawner extends Spawner {

    private npcType: ENpcType;
    private maxNrOfNpcs: number;
    private level: number;
    private spawnRate: number;
    private x: number;
    private y: number;
    private spawnTimer: number;
    private sceneObject: ISceneObject | undefined;

    constructor(parentSector: SSector, npcType: ENpcType, level: number, maxNrOfNpcs: number, spawnRate: number) {
        super(parentSector);
        this.npcType = npcType;
        this.maxNrOfNpcs = maxNrOfNpcs;
        this.level = level;
        this.spawnRate = spawnRate;
        this.spawnTimer = 0;
        this.x = Utils.getRandomNumber(-40000, 40000);
        this.y = Utils.getRandomNumber(-40000, 40000);
        this.sceneObject = undefined;
        if(npcType == ENpcType.PIRATE) {
            this.sceneObject = {
                id: IdHandler.getNewGameObjectId(),
                type: ESceneObjectType.PIRATE_HOLD,
                x: this.x,
                y: this.y
            }
        } else if(npcType == ENpcType.SMUGGLER) {
            this.sceneObject = {
                id: IdHandler.getNewGameObjectId(),
                type: ESceneObjectType.SMUGGLER_HIDEOUT,
                x: this.x,
                y: this.y
            }
        }
    }

    public update1000ms() {
        if(this.getParentSector().getNpcs().size < this.maxNrOfNpcs) {
            this.spawnTimer++;
            if(this.spawnTimer >= this.spawnRate) {
                this.spawnTimer = 0;
                let stats : Array<number> = new Array();
                Object.values(EStatType).forEach(a => stats.push(0));
    
                let newNpc: INpc = {
                    type: this.npcType,
                    id : IdHandler.getNewGameObjectId(),
                    name : NpcInfo.getNpcInfo(this.npcType,).name,
                    x : this.x,
                    y : this.y,
                    state : {
                    meters_per_second: 0,
                    isMoving : false,
                    hasDestination : false,
                    isAttacking : false,
                    isMining : false,
                    targetId : -1,
                    destVec : [0, 0],
                    velVec : [0, 0]
                    },
                    stats : stats,
                    properties : {
                    currentArmor: 0,
                    currentHull : 0,
                    currentShield : 0
                    },
                    modules : [
                        {moduleItem: ItemFactory.createModule(EModuleItemType.MAIN_MODULE, 1), x: 0, y : 0},
                        {moduleItem: ItemFactory.createModule(EModuleItemType.TURRET_MODULE, 1), x: 1, y : 0},
                        {moduleItem: ItemFactory.createModule(EModuleItemType.RADAR_RANGE_MODULE, 1), x: 0, y : 1},
                        {moduleItem: ItemFactory.createModule(EModuleItemType.THRUST_MODULE, 1), x: 1, y : 1}
                    ]
                }
    
                this.getParentSector().addNpc(new SNpc(this, newNpc));
            }
        }
    }

    public getSceneObjects() : Array<ISceneObject> {
        if(this.sceneObject != undefined) {
            return Array.of(this.sceneObject);
        } else {
            return new Array();
        }
       
    }

    public update40ms() {

    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }
}