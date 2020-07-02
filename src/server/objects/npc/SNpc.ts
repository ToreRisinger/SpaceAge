import { INpc } from "../../../shared/data/npc/INpc";
import { SShip } from "../SShip";
import { Utils } from "../../../shared/util/Utils";
import { SSector } from "../../sector/SSector";
import { NpcSpawner } from "../../spawner/NpcSpawner";

export class SNpc extends SShip {

    private npcData: INpc;
    private spawner: NpcSpawner;

    constructor(spawner: NpcSpawner, npcData: INpc) {
        super(npcData, false);
        this.spawner = spawner;
        this.npcData = npcData;
        this.newDestination(this.spawner.getX() + Utils.getRandomNumber(-2000, 2000), this.spawner.getY() + Utils.getRandomNumber(-2000, 2000))
    }

    public update40ms(sector: SSector) {
        super.update40ms(sector);
    }

    public update1000ms(sector: SSector) {
        super.update1000ms(sector);
        this.updateAIAction();
    }

    private updateAIAction() {
        if(Utils.chance(5)) {
            this.newDestination(this.spawner.getX() + Utils.getRandomNumber(-10000, 10000), this.spawner.getY() + Utils.getRandomNumber(-10000, 10000))
        }
    }

    public getData() : INpc {
        return this.npcData;
    }
}