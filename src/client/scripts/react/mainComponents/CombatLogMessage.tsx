import React, { Fragment } from "react";
import { ICombatLogMessage, ICombatLogMessageType } from "../../../../shared/interfaces/CombatLogInterfaces";
import { Colors } from "../../modules/colors/Colors";

export interface CombatLogMessageProps { combatLogMessage : ICombatLogMessage; }

export default class CombatLogMessage extends React.Component<CombatLogMessageProps, {}> {

    constructor(props : CombatLogMessageProps) {
        super(props)
        this.getText = this.getText.bind(this);
    }   

    render() {
        return (
            <div className="chat_message">
                {this.getText(this.props.combatLogMessage)}
            </div>
        );
    }

    getText(combatLogMessage : ICombatLogMessage) {
        switch(combatLogMessage.type) {
            case ICombatLogMessageType.DAMAGE_DEALT:
                return (<Fragment>
                            <span style={{color: Colors.RGB.GREEN}}>You</span> dealt <span style={{color: Colors.RGB.YELLOW}}>{
                                //@ts-ignore
                                this.props.combatLogMessage.damage
                            }</span> damage to <span style={{color: Colors.RGB.RED}}>{
                                //@ts-ignore
                                this.props.combatLogMessage.target
                            }</span>.
                        </Fragment>)
            case ICombatLogMessageType.DAMAGE_RECEIVED:
                return (<Fragment>
                            <span style={{color: Colors.RGB.RED}}>{
                                //@ts-ignore
                                this.props.combatLogMessage.attacker
                            }
                            </span> dealt <span style={{color: Colors.RGB.YELLOW}}>{
                                //@ts-ignore
                                this.props.combatLogMessage.damage
                            }</span> damage to <span style={{color: Colors.RGB.GREEN}}>you</span>.
                        </Fragment>)
                                      
            case ICombatLogMessageType.MISS_DEALT:
                return (<Fragment>
                        <span style={{color: Colors.RGB.GREEN}}>You</span> missed <span style={{color: Colors.RGB.RED}}>{
                            //@ts-ignore
                            this.props.combatLogMessage.target
                        }</span>.
                    </Fragment>)
            case ICombatLogMessageType.MISS_RECEIVED:
                    return (<Fragment>
                            <span style={{color: Colors.RGB.RED}}>{
                                //@ts-ignore
                                this.props.combatLogMessage.attacker
                            } </span> missed <span style={{color: Colors.RGB.GREEN}}>you</span>.
                        </Fragment>)
            case ICombatLogMessageType.ASTROID_MINED:
                return (<Fragment>
                        <span style={{color: Colors.RGB.GREEN}}>You</span> mined <span style={{color: Colors.RGB.YELLOW}}>{
                            //@ts-ignore
                            this.props.combatLogMessage.amount
                        }</span> m<sup>2</sup> from <span style={{color: Colors.RGB.YELLOW}}>{
                            //@ts-ignore
                            this.props.combatLogMessage.targetAstroid
                        }</span>.
                    </Fragment>);
            default:
                break;
        }
    }
}