import { GameObject } from "./GameObject";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { GameScene } from "../scenes/GameScene";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { GlobalData } from "../modules/GlobalData";


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