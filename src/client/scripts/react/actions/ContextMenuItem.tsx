import React from "react";
import { Action } from "../../modules/action/fw/Action";
import { ActionManager } from "../../modules/action/ActionManager";
import { InputHandler } from "../../modules/InputHandler";

export interface ContextMenuItemProps {action: Action}

export default class ContextMenuItem extends React.Component<ContextMenuItemProps, {}> {

    constructor(props : ContextMenuItemProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        ActionManager.runAction(this.props.action);
    }

    render() {
        let shortCutString = this.props.action.getShortCut() != InputHandler.EKey.NONE ? " (" + this.props.action.getShortCut() + ")" : "";
        return (
            <div id="context_menu_item" className="BackgroundHoverHighlight" onClick={this.onClick}>
                    {this.props.action.getName() + shortCutString}
            </div>
        );
    }
}