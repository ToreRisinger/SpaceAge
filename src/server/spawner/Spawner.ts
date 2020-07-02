import { SSector } from "../sector/SSector";
import { ISceneObject } from "../../shared/data/gameobject/ISceneObject";

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
    abstract getSceneObjects(): Array<ISceneObject>;
}