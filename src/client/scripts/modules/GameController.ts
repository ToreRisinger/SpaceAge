import { EventHandler } from "./EventHandler";
import { SelectionHandler } from "./SelectionHandler";
import { TargetHandler } from "./TargetHandler";
import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { GameObjectHandler } from "./GameObjectHandler";
import { Chat } from "./Chat";
import { Camera } from "./Camera";
import { GraphicsEffects } from "./graphics/GraphicEffects";
import { Com } from "./Com";
import { GUI } from "./GUI";
import { Events } from "../../../shared/util/Events";
import { GlobalDataService } from "./GlobalDataService";
import { CSector } from "../game_objects/CSector";
import { CCharacter } from "../game_objects/CCharacter";
import { Logger } from "../../../shared/logger/Logger";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { ActionManager } from "./action/ActionManager";
import { EGameState } from "../../../shared/util/EGameState";
import { ISector } from "../../../shared/data/sector/ISector";
import { CommandManager } from "./command/CommandManager";
import { FpsCounter } from "./FpsCounter";

export class GameController {

    private gameState : EGameState;
    private updateFunction : (time : number, delta : number) => void = this.loginStateUpdate;
    private static instance : GameController | undefined = undefined;

    constructor() {
        this.gameState = EGameState.LOADING
        this.changeGameState = this.changeGameState.bind(this);
        GameController.instance = this;
    }

    public static getInstance(): GameController | undefined {
        return GameController.instance;
    }

    public getState(): EGameState {
        return this.gameState;
    }

    public init() {
        EventHandler.init();
        Com.init();
        this.subscribeToEvents();
        this.changeGameState(EGameState.LOGIN);
    }

    public inSpaceStateInit(character: ICharacter, sectors : Array<ISector>, clientSectorId: number) {
        let thisSector = sectors.find(sec => sec.id == clientSectorId);
        
        //@ts-ignore
        GameObjectHandler.init(character, sectors, thisSector);
        
        //@ts-ignore
        let sector : CSector = GameObjectHandler.getGameObjectsMap().get(clientSectorId);
        //@ts-ignore
        let playerShip : CCharacter = GameObjectHandler.getPlayerShip();
        GlobalDataService.createInstance(character, playerShip, sector);
       
        FpsCounter.init();
        GameObjectHandler.init2();
        SelectionHandler.init();
        TargetHandler.init();
        Background.init();
        InputHandler.init();
        Chat.init(); 
        CommandManager.init();
        Camera.init();
        GraphicsEffects.init();
        ActionManager.init();
        GUI.init();
    }

    public getGameState() : EGameState {
        return this.gameState;
    }

    public update(time : number, delta : number) {
        this.updateFunction(time, delta);
    }

    private loginStateUpdate(time : number, delta : number) {
        EventHandler.update(time, delta);
    }

    private loggingInStateUpdate(time : number, delta : number) {
        EventHandler.update(time, delta);
    }

    private characterSelectionStateUpdate(time : number, delta : number) {
        EventHandler.update(time, delta);
    }

    private loadingGameStateUpdate(time : number, delta : number) {
        EventHandler.update(time, delta);
    }

    private inSpaceUpdate(time : number, delta : number) {
        //console.log("Time: " + time + ", Delta: " + delta);
        FpsCounter.update(time, delta);
        InputHandler.update(time, delta);
        EventHandler.update(time, delta);
        ActionManager.update(time, delta);
        SelectionHandler.update(time, delta);
        TargetHandler.update(time, delta);
        GameObjectHandler.update(time, delta);
        Camera.update(time, delta);
        GameObjectHandler.updateGraphics(time, delta);
        Background.update(time, delta);
        GraphicsEffects.update(time, delta);
        GUI.update(time, delta);
        Chat.update(time, delta);
    }

    private onGameStateChange(event : Events.GAME_STATE_CHANGED) {
        switch(event.data.gameState) { 
            case EGameState.LOGGING_IN_LOADING: {
                this.updateFunction = this.loggingInStateUpdate;
                break; 
            } 
            case EGameState.CHARACTER_SELECTION: { 
                this.updateFunction = this.characterSelectionStateUpdate;
                break; 
            }
            case EGameState.LOADING_GAME: { 
                this.updateFunction = this.loadingGameStateUpdate;
                break; 
            }
            case EGameState.IN_SPACE: {
                this.updateFunction = this.inSpaceUpdate;
                break; 
            }
            default: { 
               break; 
            } 
        } 
    }

    private changeGameState(state : EGameState) {
        Logger.debug("Game state changed from: " + this.gameState + " to " + state);
        this.gameState = state;
        this.triggerGameStateChangeEvent();
    }

    private triggerGameStateChangeEvent() {
        let event : Events.GAME_STATE_CHANGED = {
            eventId : Events.EEventType.GAME_STATE_CHANGE,
            data : {
                gameState : this.gameState
            }
        }
        EventHandler.pushEvent(event);
    }

    //TODO remove
    private onClientLoginReq(event : Events.CLIENT_LOGIN_REQ) {
        this.changeGameState(EGameState.LOGGING_IN_LOADING);
    }

    private onServerLoginAck(event : Events.SERVER_LOGIN_ACK) {
        this.changeGameState(EGameState.CHARACTER_SELECTION);
    }

    private onClientJoinReq(event : Events.CLIENT_JOIN_REQ) {
        this.changeGameState(EGameState.LOADING_GAME);
    }

    private onServerJoinAck(event : Events.SERVER_JOIN_ACK) {
        this.inSpaceStateInit(event.data.character, event.data.sectors, event.data.clientSectorId);
        this.changeGameState(EGameState.IN_SPACE);
    }

    private subscribeToEvents() {
        EventHandler.on(Events.EEventType.GAME_STATE_CHANGE, (event : Events.GAME_STATE_CHANGED) => {this.onGameStateChange(event)});

        //EventHandler.on(Events.EEventType.CLIENT_LOGIN_REQ, (event : Events.CLIENT_LOGIN_REQ) => {this.onClientLoginReq(event)});
        EventHandler.on(Events.EEventType.SERVER_LOGIN_ACK, (event : Events.SERVER_LOGIN_ACK) => {this.onServerLoginAck(event)});
        EventHandler.on(Events.EEventType.CLIENT_JOIN_REQ, (event : Events.CLIENT_JOIN_REQ) => {this.onClientJoinReq(event)});
        EventHandler.on(Events.EEventType.SERVER_JOIN_ACK, (event : Events.SERVER_JOIN_ACK) => {this.onServerJoinAck(event)}); 
    }
}