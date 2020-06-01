import React from "react";
import AbilityContainer from "./AbilityContainer";
import { AbilityHandler } from "../../modules/abilities/AbilityHandler";
import { Ability } from "../../modules/abilities/Ability";

export interface AbilityPanelState { abilities : Array<Ability>; }

export default class AbilityPanel extends React.Component<{}, AbilityPanelState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
        super(props)
        this.state = {
            abilities : AbilityHandler.getAbilities()
        }
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }
    
    componentWillUnmount() {

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