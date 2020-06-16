import { RadarDetectable } from "../../../game_objects/RadarDetectable";

export abstract class Action {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public abstract isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean;

    public abstract run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void;
}