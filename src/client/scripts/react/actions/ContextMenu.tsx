import React from "react";
import { Action } from "../../modules/action/fw/Action";
import ContextMenuItem from "./ContextMenuItem";

export interface ContextMenuProps { actions: Array<Action> }

export default class ContextMenu extends React.Component<ContextMenuProps, {}> {

    constructor(props : ContextMenuProps) {
        super(props)
    }

    render() {

        return (
            <div id="context_menu">
                {this.props.actions.map((object, i) => <ContextMenuItem action={object} key={i}></ContextMenuItem>)} 
            </div>
        );
    }
}