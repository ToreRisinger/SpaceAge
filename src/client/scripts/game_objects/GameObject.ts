import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";

export class GameObject {

    private game_object_config : ObjectInterfaces.IGameObject;

    constructor(game_object_config : ObjectInterfaces.IGameObject) {
        game_object_config.x = Math.floor(game_object_config.x);
        game_object_config.y = Math.floor(game_object_config.y);
        this.game_object_config = game_object_config;
    }

    public getPos() {
        return new Phaser.Math.Vector2(this.game_object_config.x, this.game_object_config.y);
    }

    public update() {
        
    }

    public updateDataObjectConfig(game_object_config : ObjectInterfaces.IGameObject) {
        this.game_object_config = game_object_config;
    }

    public destroy() {
        
    }

    public getGameObjectData() : ObjectInterfaces.IGameObject {
        return this.game_object_config;
    }
}