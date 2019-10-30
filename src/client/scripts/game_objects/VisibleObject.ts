import { GameObject } from "./GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";


export class VisibleObject extends GameObject {

    constructor(game_object_config : ObjectInterfaces.IGameObject) {
        super(game_object_config);
    }

    public update() {
        
    }

    public destroy() {
        super.destroy();   
    }
}