import React from "react";
import AbilityContainer from "./AbilityContainer";
import { AbilityHandler } from "../../modules/abilities/AbilityHandler";
import { Ability } from "../../modules/abilities/Ability";

export interface AbilityPanelState { abilities : Array<Ability>; }

export default class AbilityPanel extends React.Component<{}, AbilityPanelState> {

    private eventHandlerWaitTimer : ReturnType<typeof setTimeout> | undefined;
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
        super(props)
        this.state = {
            abilities : new Array<Ability>()
        }
        this.eventHandlerWaitTimer = undefined;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.eventHandlerWaitTimer = setInterval(
           () => this.eventHandlerRegistration(),
           1000
        );
    }
    
    componentWillUnmount() {

    }
  
    eventHandlerRegistration() {
        if(AbilityHandler.isInitialized()) {
            this.setState({
                abilities : AbilityHandler.getAbilities()
            });
            if(this.eventHandlerWaitTimer != undefined) {
              clearInterval(this.eventHandlerWaitTimer);
            }
            this.timerID = setInterval(
                () => this.tick(),
                100
             );
        }
    }

    tick() {
        this.setState({
            abilities : this.state.abilities
        });
    }

    render() {
        return (
            <div id="ability_panel">
                {this.state.abilities.map((object, i) => <AbilityContainer ability={object} key={i}/>)}
            </div>
        );
    }
}