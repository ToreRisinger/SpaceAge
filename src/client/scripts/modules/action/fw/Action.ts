import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";

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

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.NONE;
    }
}