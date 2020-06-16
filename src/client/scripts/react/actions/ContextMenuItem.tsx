import React from "react";
import { Action } from "../../modules/action/fw/Action";
import { ActionManager } from "../../modules/action/ActionManager";

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
        return (
            <div id="context_menu_item" className="Unselectable" onClick={this.onClick}>
                    {this.props.action.getName() + " (" + this.props.action.getShortCut() + ")"}
            </div>
        );
    }
}