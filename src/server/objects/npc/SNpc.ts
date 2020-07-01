import { INpc } from "../../../shared/data/npc/INpc";
import { SShip } from "../SShip";
import { Utils } from "../../../shared/util/Utils";
import { SSector } from "../../sector/SSector";

export class SNpc extends SShip {

    private npcData: INpc;

    constructor(npcData: INpc) {
        super(npcData, false);
        this.npcData = npcData;
        this.getData().x = 10000;
        this.getData().y = 10000;
        this.newDestination(Utils.getRandomNumber(-2000, 2000), Utils.getRandomNumber(-2000, 2000))
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
            this.newDestination(this.getData().x + Utils.getRandomNumber(-2000, 2000), this.getData().y + Utils.getRandomNumber(-2000, 2000))
        }
    }

    public getData() : INpc {
        return this.npcData;
    }
}