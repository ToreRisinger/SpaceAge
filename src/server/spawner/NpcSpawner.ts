import { SSector } from "../sector/Sector";
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

export class NpcSpawner extends Spawner {

    private npcType: ENpcType;
    private maxNumberOfNpcs: number;

    constructor(npcType: ENpcType, parentSector: SSector) {
        super(parentSector);
        this.npcType = npcType;
        this.maxNumberOfNpcs = 2;
    }

    public update1000ms() {
        if(this.getParentSector().getNpcs().size < this.maxNumberOfNpcs) {
            if(Utils.chance(5)) {
                let stats : Array<number> = new Array();
                Object.values(EStatType).forEach(a => stats.push(0));
    
                let newNpc: INpc = {
                    type: this.npcType,
                    id : IdHandler.getNewGameObjectId(),
                    name : NpcInfo.getNpcInfo(this.npcType,).name,
                    x : 0,
                    y : 0,
                    state : {
                    meters_per_second: 0,
                    isMoving : false,
                    hasDestination : false,
                    isAttacking : false,
                    isMining : false,
                    hasWeapon : false,
                    hasMiningLaser : false,
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
    
                this.getParentSector().addNpc(new SNpc(newNpc));
            }
        
        }
    }

    public update40ms() {

    }
}