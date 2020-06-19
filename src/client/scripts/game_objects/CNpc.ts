import { CShip } from "./CShip";
import { INpc } from "../../../shared/data/npc/INpc";
import { ENpcType } from "../../../shared/data/npc/ENpcType";

export class CNpc extends CShip {

    private npcData: INpc;

    constructor(npcData : INpc) {
        super(npcData, false);
        this.npcData = npcData;
    }

    public getType(): ENpcType {
        return this.npcData.type;
    }

    public updateData(npcData : INpc) {
        super.updateData(npcData);
        this.npcData = npcData;
    }

    public getData(): INpc {
        return this.npcData;
    }
}