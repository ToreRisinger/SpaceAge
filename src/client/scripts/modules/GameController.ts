import { EventHandler } from "./EventHandler";
import { AbilityHandler } from "./abilities/AbilityHandler";
import { SelectionHandler } from "./SelectionHandler";
import { TargetHandler } from "./TargetHandler";
import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { GameStateController } from "./GameStateController";
import { GameObjectHandler } from "./GameObjectHandler";
import { Chat } from "./Chat";
import { Camera } from "./Camera";
import { Graphics } from "./Graphics";
import { Com } from "./Com";
import { GUI } from "./GUI";


export class GameController {

    constructor() {
        
    }

    public init() {
        EventHandler.init();
        AbilityHandler.init();
        SelectionHandler.init();
        TargetHandler.init();
        Background.init();
        InputHandler.init();
        GameStateController.init();
        GameObjectHandler.init();
        Chat.init(); 
        Camera.init();
        Graphics.init();
        Com.init();
        GUI.init();
    }

    public update(time : number, delta : number) {
        InputHandler.update(time, delta);
        SelectionHandler.update(time, delta);
        TargetHandler.update(time, delta);
        EventHandler.update(time, delta);
        AbilityHandler.update(time, delta);
        Camera.update(time, delta);
        GameObjectHandler.update(time, delta);   
        Background.update(time, delta);
        Graphics.update(time, delta);
        GUI.update(time, delta);
        Chat.update(time, delta);
        InputHandler.update(time, delta);
        SelectionHandler.update(time, delta);
        TargetHandler.update(time, delta);
        EventHandler.update(time, delta);
        AbilityHandler.update(time, delta);
        Camera.update(time, delta);
        GameObjectHandler.update(time, delta);   
        Background.update(time, delta);
        Graphics.update(time, delta);
        GUI.update(time, delta);
        Chat.update(time, delta);
    }
}