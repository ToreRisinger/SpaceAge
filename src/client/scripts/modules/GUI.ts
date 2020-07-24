import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/util/Events";
import { Utils } from "../../../shared/util/Utils";
import { EventHandler } from "./EventHandler";
import { GlobalDataService } from "./GlobalDataService";
import { Camera } from "./Camera";
import { CUtils } from "../utils/CUtils";

export module GUI {
    export function init() {
        let gameScene : GameScene = GameScene.getInstance();
        gameScene.input.mouse.capture = true;

        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        
    }

    function onBackgroundClicked(event : Events.BACKGROUND_CLICKED_TWICE_EVENT_CONFIG) {
        newDestination(event.data.mouseX, event.data.mouseY);
    }

    function newDestination(x : number, y : number) {
        let globalData = GlobalDataService.getInstance();
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(x * globalData.getCameraZoom(), y * globalData.getCameraZoom()),
        Camera.getMapPos().x, Camera.getMapPos().y, globalData.getCameraWidth(), globalData.getCameraHeight());
        CUtils.newDestination(newDestination.x, newDestination.y);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.BACKGROUND_CLICKED_TWICE_EVENT, onBackgroundClicked);
    }
}
