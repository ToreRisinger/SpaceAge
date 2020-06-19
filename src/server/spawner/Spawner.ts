import { Sector } from "../sector/Sector";

export abstract class Spawner {

    private parentSector: Sector;

    constructor(parentSector: Sector) {
        this.parentSector = parentSector;
    }

    protected getParentSector() {
        return this.parentSector;
    }

    abstract update1000ms(): void;
    abstract update40ms(): void;
}