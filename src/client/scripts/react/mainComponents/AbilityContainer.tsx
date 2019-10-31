import React from "react";
import { Ability } from "../../modules/abilities/Ability";
import { EAbilityState } from "../../modules/abilities/EAbilityState";

export interface AbilityContainerProps { ability : Ability; }

export default class AbilityContainer extends React.Component<AbilityContainerProps, {}> {

    constructor(props : AbilityContainerProps) {
        super(props)
        this.onClickAbility = this.onClickAbility.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    onClickAbility() {
        this.props.ability.activate();
    }

    render() {
        return (
            <div className="ability_container">
                <img className={this.getClassName()} src={this.props.ability.getIconPath()} onClick={this.onClickAbility}/>
            </div>
        );
    }

    getClassName() {
        if(this.props.ability.getState() == EAbilityState.ENABLED) {
            return "ability_icon Unselectable ability_enabled";
        } else if(this.props.ability.getState() == EAbilityState.DISABLED) {
            return "ability_icon Unselectable ability_disabled";
        } else if(this.props.ability.getState() == EAbilityState.ACTIVATED) {
            return "ability_icon Unselectable ability_activated";
        } else if(this.props.ability.getState() == EAbilityState.COOLDOWN) {
            return "ability_icon Unselectable ability_cooldown";
        }
    }
}