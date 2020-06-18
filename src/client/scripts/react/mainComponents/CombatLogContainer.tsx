import React from "react";
import CombatLogMessage from "./CombatLogMessage";
import { ICombatLogMessage } from "../../../../shared/data/CombatLogInterfaces";

export interface CombatLogContainerProps { combatLogMessages : Array<ICombatLogMessage>; }

export default class CombatLogContainer extends React.Component<CombatLogContainerProps, {}> {

    constructor(props : CombatLogContainerProps) {
        super(props)
    }

    render() {
        return (
            <div id="chat_container">
                {this.props.combatLogMessages.map((object, i) => <CombatLogMessage combatLogMessage={object} key={i} />)}
            </div>
        );
    }
}