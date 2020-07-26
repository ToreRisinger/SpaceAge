import React, {Fragment} from "react";
import { CCharacter } from "../game_objects/CCharacter";
import ShipStatPanel from "./mainComponents/stats/ShipStatPanel";
import SideMenu from "./mainComponents/SidePanel";
import ChatWindow from "./mainComponents/ChatWindow";
import RulerPanel from "./mainComponents/RulerPanel";
import { EventHandler } from "../modules/EventHandler";
import { Events } from "../../../shared/util/Events";
import LoadingPage from "./mainComponents/login/LoadingPage";
import CharacterSelectionPage from "./mainComponents/login/CharacterSelectionPage";
import LocationPanel from "./mainComponents/LocationPanel";
import TopButtonPanel from "./topbuttonpanel/TopButtonPanel";
import ContextMenuPanel from "./actions/ContextMenuPanel";
import { EGameState } from "../../../shared/util/EGameState";
import LootWindow from "./mainComponents/cargo/LootWindow";
import { GameController } from "../modules/GameController";
import { HomePage } from "./mainComponents/login/HomePage";
import SelectionPanel from "./mainComponents/SelectionPanel";
import TargetPanel from "./mainComponents/TargetPanel";
import NavigationPanel from "./mainComponents/NavigationPanel";
import CargoPanel from "./mainComponents/cargo/CargoPanel";
import MoneyContainer from "./mainComponents/cargo/MoneyContainer";

export interface AppState { gameState : EGameState; }

export default class App extends React.Component<{}, AppState> {
    
    private eventHandlerWaitTimer : ReturnType<typeof setTimeout> | undefined;
    
    constructor(props : CCharacter) {
        super(props);
        this.state = {
            gameState : EGameState.LOADING
        }
        this.eventHandlerWaitTimer = undefined;
        this.eventHandlerRegistration = this.eventHandlerRegistration.bind(this);
        this.onGameStateChange = this.onGameStateChange.bind(this);
    }

    componentDidMount() {
        this.eventHandlerWaitTimer = setInterval(
           () => this.eventHandlerRegistration(),
           1000
        );
    }
    
    componentWillUnmount() {
        
    }

    onGameStateChange(event : Events.GAME_STATE_CHANGED) {
        this.setState({
            gameState : event.data.gameState
        })
    }

    eventHandlerRegistration() {
        if(EventHandler.isInitialized()) {
            //@ts-ignore
            if(GameController.getInstance() != undefined && GameController.getInstance().getState() != EGameState.LOADING && this.eventHandlerWaitTimer != undefined) {
              clearInterval(this.eventHandlerWaitTimer);
              EventHandler.on(Events.EEventType.GAME_STATE_CHANGE, this.onGameStateChange)
              this.setState({
                  gameState: EGameState.LOGIN
              })
            }
        }
    }
 
    getElements(gameState : EGameState) {
        switch(gameState) { 
            case EGameState.LOADING: {
                return (
                    <Fragment>
                        <LoadingPage/>
                    </Fragment>
                )
            }
            case EGameState.LOGIN : {
                return (
                    <Fragment>
                        <HomePage/>
                    </Fragment>
                )
            }
            case EGameState.LOGGING_IN_LOADING: {
                return (
                    <Fragment>
                        <LoadingPage/>
                    </Fragment>
                ) 
            } 
            case EGameState.CHARACTER_SELECTION: { 
                return (
                    <Fragment>
                        <CharacterSelectionPage/>
                    </Fragment>
                )
            }
            case EGameState.LOADING_GAME: { 
                return (
                    <Fragment>

                    </Fragment>
                )
            }
            case EGameState.IN_SPACE: {
                return (
                    <Fragment>
                        <ShipStatPanel/>
                        <SideMenu/>
                        <ChatWindow/>
                        <NavigationPanel/>
                        <CargoPanel/>
                        <RulerPanel/>
                        <LocationPanel/>
                        <TopButtonPanel/>
                        <ContextMenuPanel/>
                        <LootWindow/>
                        <SelectionPanel/>
                        <TargetPanel/>
                        <MoneyContainer/>
                    </Fragment>
                ) 
            }
            case EGameState.DOCKED: {
                return (
                    <Fragment>
                        <ChatWindow/>
                        <SelectionPanel/>
                        <NavigationPanel/>
                        <CargoPanel/>
                        <MoneyContainer/>
                    </Fragment>
                ) 
            }
            default: { 
               break; 
            } 
        } 
    }

    render() {
        return (
            this.getElements(this.state.gameState)
        )
    }
}