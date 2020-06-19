import { Sector } from "../sector/Sector";
import { Spawner } from "./Spawner";
import { ENpcType } from "../../shared/data/npc/ENpcType";
import { Utils } from "../../shared/util/Utils";
import { INpc } from "../../shared/data/npc/INpc";
import { IdHandler } from "../IdHandler";
import { EStatType } from "../../shared/data/stats/EStatType";
import { ItemFactory } from "../ItemFactory";
import { EModuleItemType } from "../../shared/data/item/EModuleItemType";
import { SNpc } from "../objects/npc/SNpc";

export class NpcSpawner extends Spawner {

    private npcType: ENpcType;

    constructor(npcType: ENpcType, parentSector: Sector) {
        super(parentSector);
        this.npcType = npcType;
    }

    public update1000ms() {
        if(Utils.chance(5)) {
            let stats : Array<number> = new Array();
            Object.values(EStatType).forEach(a => stats.push(0));

            let newNpc: INpc = {
                type: this.npcType,
                id : IdHandler.getNewGameObjectId(),
                name : "Enemy",
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
                    {moduleItem: ItemFactory.createModule(EModuleItemType.POWER_MODULE, 1), x: -1, y : -1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.SHIELD_MODULE, 1), x: 0, y : -1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.LASER_MODULE, 1), x: 1, y : -1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ENGINE_MODULE, 1), x: -1, y : 0},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.MAIN_MODULE, 1), x: 0, y : 0},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.CARGO_HOLD_MODULE, 1), x: 1, y : 0},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: -1, y : 1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.RADAR_MODULE, 1), x: 0, y : 1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.TRACKING_SYSTEM_MODULE, 1), x: 1, y : 1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: 1, y : 2},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.LASER_MODULE, 1), x: 1, y : 3},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.TURRET_MODULE, 1), x: 1, y : 4},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 2, y : 1},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 3, y : 2},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 4, y : 3},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 5, y : 4},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 6, y : 5},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 7, y : 6},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 8, y : 7},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 9, y : 8},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 10, y : 9},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.MINING_LASER_MODULE, 1), x: 11, y : 10},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 12, y : 11},
                    {moduleItem: ItemFactory.createModule(EModuleItemType.ARMOR_MODULE, 1), x: 13, y : 12}
                ]
            }

            this.getParentSector().addNpc(new SNpc(newNpc));
        }
    }

    public update40ms() {

    }
}