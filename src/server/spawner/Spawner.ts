import { SSector } from "../sector/Sector";

export abstract class Spawner {

    private parentSector: SSector;

    constructor(parentSector: SSector) {
        this.parentSector = parentSector;
    }

    protected getParentSector() {
        return this.parentSector;
    }

    abstract update1000ms(): void;
    abstract update40ms(): void;
}