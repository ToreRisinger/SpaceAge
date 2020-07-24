import { SClient } from "../objects/SClient";

export class SSpaceStation {

    private id: number;
    private x: number;
    private y: number;
    private dockingPlayers: Set<SClient>;

    constructor(id: number, x: number, y: number) {
        this.id = id;
        this.dockingPlayers = new Set();
        this.x = x;
        this.y = y;
    }

    public update40ms() {
        let finishedDocking: Array<SClient> = new Array();
        this.dockingPlayers.forEach(client => {
            if(!client.getCharacter().getData().dockingState) {
                finishedDocking.push(client);
            } else if(client.getCharacter().getData().x == this.x && client.getCharacter().getData().y == this.y) {
                client.getCharacter().getData().dockingState.isDocking = false;
            }
        });

        finishedDocking.forEach(toDelete => {
            this.dockingPlayers.delete(toDelete);
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
}