import React, {Fragment} from "react";
import { CCharacter } from "../game_objects/CCharacter";
import BottomPanel from "./mainComponents/BottomPanel";
import SideMenu from "./mainComponents/SidePanel";
import NavigationPanel from "./mainComponents/NavigationPanel";
import Chat from "./mainComponents/ChatWindow";
import CargoPanel from "./mainComponents/cargo/CargoPanel";
import RulerPanel from "./mainComponents/RulerPanel";
import { EventHandler } from "../modules/EventHandler";
import { Events } from "../../../shared/util/Events";
import LoginInput from "./mainComponents/login/LoginInput";
import CharacterSelectionLoadPage from "./mainComponents/login/CharacterSelectionLoadPage";
import CharacterSelectionPage from "./mainComponents/login/CharacterSelectionPage";
import LocationPanel from "./mainComponents/LocationPanel";
import TopButtonPanel from "./topbuttonpanel/TopButtonPanel";
import ContextMenuPanel from "./actions/ContextMenuPanel";
import { EGameState } from "../../../shared/util/EGameState";

export interface AppState { gameState : EGameState; }

export default class App extends React.Component<{}, AppState> {
    
    private eventHandlerWaitTimer : ReturnType<typeof setTimeout> | undefined;
    
    constructor(props : CCharacter) {
        super(props);
        this.state = {
            gameState : EGameState.LOGIN
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
           EventHandler.on(Events.EEventType.GAME_STATE_CHANGE, this.onGameStateChange)
           
           if(this.eventHandlerWaitTimer != undefined) {
              clearInterval(this.eventHandlerWaitTimer);
          }
        }
    }
 
    getElements(gameState : EGameState) {
        switch(gameState) { 
            case EGameState.LOGIN : {
                return (
                    <Fragment>
                        <LoginInput/>
                    </Fragment>
                )
            }
            case EGameState.LOGGING_IN_LOADING: {
                return (
                    <Fragment>
                        <CharacterSelectionLoadPage/>
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
                        <BottomPanel/>
                        <SideMenu/>
                        <Chat/>
                        <NavigationPanel/>
                        <CargoPanel/>
                        <RulerPanel/>
                        <LocationPanel/>
                        <TopButtonPanel/>
                        <ContextMenuPanel/>
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