import { CShip } from "./CShip";
import { INpc } from "../../../shared/data/npc/INpc";
import { ENpcType } from "../../../shared/data/npc/ENpcType";
import { SPRITES } from "../../../shared/util/SPRITES";
import { Colors } from "../../../shared/colors/Colors";

export class CNpc extends CShip {

    private npcData: INpc;

    constructor(npcData : INpc) {
        super(npcData, SPRITES.NPC_ICON.sprite, false);
        this.npcData = npcData;
        this.setIconBaseColor(Colors.HEX.ORANGE);
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