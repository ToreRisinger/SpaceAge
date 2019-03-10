import { DataObjects } from "../../../shared/scripts/DataObjects";

export class GameObject {

    private game_object_config : DataObjects.Game_Object_Config;

    constructor(game_object_config : DataObjects.Game_Object_Config) {
        this.game_object_config = game_object_config;
    }

    public getPos() {
        return new Phaser.Math.Vector2(this.game_object_config.x, this.game_object_config.y);
    }

    public update() {
        
    }

    public updateDataObjectConfig(game_object_config : DataObjects.Game_Object_Config) {
        this.game_object_config = game_object_config;
    }

    public destroy() {
        
    }
}