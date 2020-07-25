import { SClient } from "../objects/SClient";
import { SSector } from "../sector/SSector";
import { PacketFactory } from "../PacketFactory";

export class SSpaceStation {

    private id: number;
    private x: number;
    private y: number;
    private sector: SSector;
    private dockingPlayers: Set<SClient>;
    private dockedPlayers: Set<SClient>;

    constructor(id: number, x: number, y: number, sector: SSector) {
        this.id = id;
        this.dockingPlayers = new Set();
        this.dockedPlayers = new Set();
        this.x = x;
        this.y = y;
        this.sector = sector;
    }

    public update40ms() {
        let playersFinishedDocking: Array<SClient> = new Array();
        this.dockingPlayers.forEach(client => {
            if(client.getCharacter().getData().x == this.x && client.getCharacter().getData().y == this.y) {
                client.getCharacter().getData().dockingState.isDocking = false;
                client.getCharacter().getData().dockingState.isDocked = true;
                playersFinishedDocking.push(client);
            }
        });

        playersFinishedDocking.forEach(dockedClient => {
            this.dockingPlayers.delete(dockedClient);
            this.dockedPlayers.add(dockedClient);
            this.sector.removeClient(dockedClient);
            this.sendDockedEvent(dockedClient);
        });
    }

    public update1000ms() {

    }

    public getId() {
        return this.id;
    }

    public onPlayerDockRequest(client: SClient) {
        this.dockingPlayers.add(client);
        client.getCharacter().startDocking(this.x, this.y);
    }

    private sendDockedEvent(client: SClient) {
        let packet : any = PacketFactory.createDockedAckPackage();
        client.getData().socket.emit("ServerEvent", packet);
    }
}