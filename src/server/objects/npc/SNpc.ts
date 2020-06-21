import { INpc } from "../../../shared/data/npc/INpc";
import { SShip } from "../SShip";
import { Utils } from "../../../shared/util/Utils";
import { SSector } from "../../sector/Sector";

export class SNpc extends SShip {

    private npcData: INpc;

    constructor(npcData: INpc) {
        super(npcData, false);
        this.npcData = npcData;
    }

    public update40ms(sector: SSector) {
        super.update40ms(sector);
    }

    public update1000ms(sector: SSector) {
        super.update1000ms(sector);
        this.updateAIAction();
    }

    private updateAIAction() {
        if(Utils.chance(50)) {
            this.newDestination(this.getData().x + Utils.getRandomNumber(-200, 200), this.getData().y + Utils.getRandomNumber(-200, 200))
        }
    }

    public getData() : INpc {
        return this.npcData;
    }
}