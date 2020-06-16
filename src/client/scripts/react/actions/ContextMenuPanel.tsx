import React from "react";
import { ActionManager } from "../../modules/action/ActionManager";
import { Action } from "../../modules/action/fw/Action";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ContextMenu from "./ContextMenu";

export interface ContextMenuPanelState { actions: Array<Action> }

export default class ContextMenuPanel extends React.Component<{}, ContextMenuPanelState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
        super(props)
        this.state = {
            actions : new Array()
        }
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            16
        );
    }

    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }

    tick() {
        this.setState({
            actions: ActionManager.getActions()
        });
    }

    render() {
        return (
            <div id="context_menu_panel" className="">
                <ContextMenu actions={this.state.actions}></ContextMenu>
            </div>
        );
    }
}