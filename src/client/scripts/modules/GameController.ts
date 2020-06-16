import { EventHandler } from "./EventHandler";
import { AbilityHandler } from "./abilities/AbilityHandler";
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
import { Events } from "../../../shared/scripts/Events";
import { EGameState } from "../../../shared/scripts/EGameState";
import { CharacterListProvider } from "./CharacterListProvider";
import { GlobalDataService } from "./GlobalDataService";
import { Sector } from "../game_objects/Sector";
import { Ship } from "../game_objects/Ship";
import { Logger } from "../../../shared/logger/Logger";
import { ICharacter } from "../../../shared/interfaces/ICharacter";
import { ISector } from "../../../shared/interfaces/ISector";
import { ActionManager } from "./action/ActionManager";

export class GameController {

    private gameState : EGameState;
    private updateFunction : (time : number, delta : number) => void = this.loginStateUpdate;

    constructor() {
        this.gameState = EGameState.LOGIN
        this.changeGameState = this.changeGameState.bind(this);
    }

    public init() {
        EventHandler.init();
        Com.init();
        this.subscribeToEvents()
    }

    public inSpaceStateInit(character: ICharacter, sectors : Array<ISector>, clientSectorId: number) {
        GameObjectHandler.init(character, sectors);
        //@ts-ignore
        let sector : Sector = GameObjectHandler.getGameObjectsMap().get(clientSectorId);
        //@ts-ignore
        let playerShip : Ship = GameObjectHandler.getPlayerShip();
        GlobalDataService.createInstance(character, playerShip, sector);

        GameObjectHandler.init2();
        //AbilityHandler.init();
        SelectionHandler.init();
        TargetHandler.init();
        Background.init();
        InputHandler.init();
        Chat.init(); 
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
        InputHandler.update(time, delta);
        EventHandler.update(time, delta);
        //AbilityHandler.update(time, delta);
        ActionManager.update(time, delta);
        Camera.update(time, delta);
        SelectionHandler.update(time, delta);
        TargetHandler.update(time, delta);
        GameObjectHandler.update(time, delta);
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

    private onClientLoginReq(event : Events.CLIENT_LOGIN_REQ) {
        this.changeGameState(EGameState.LOGGING_IN_LOADING);
    }

    private onServerLoginAck(event : Events.SERVER_LOGIN_ACK) {
        CharacterListProvider.createInstance(event.data.characters);
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

        EventHandler.on(Events.EEventType.CLIENT_LOGIN_REQ, (event : Events.CLIENT_LOGIN_REQ) => {this.onClientLoginReq(event)});
        EventHandler.on(Events.EEventType.SERVER_LOGIN_ACK, (event : Events.SERVER_LOGIN_ACK) => {this.onServerLoginAck(event)});
        EventHandler.on(Events.EEventType.CLIENT_JOIN_REQ, (event : Events.CLIENT_JOIN_REQ) => {this.onClientJoinReq(event)});
        EventHandler.on(Events.EEventType.SERVER_JOIN_ACK, (event : Events.SERVER_JOIN_ACK) => {this.onServerJoinAck(event)}); 
    }
}