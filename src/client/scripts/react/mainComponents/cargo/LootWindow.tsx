import React from "react";
import { ICargo } from "../../../../../shared/data/ICargo";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/util/Events";
import { GameObjectHandler } from "../../../modules/GameObjectHandler";
import { CShipwreck } from "../../../game_objects/CShipwreck";
import CargoContainer from "./CargoContainer";
import LootContainer from "./LootContainer";
import { threadId } from "worker_threads";

export interface CargoPanelState { cargo : ICargo}

export default class LootWindow extends React.Component<{}, CargoPanelState> {

    private open: boolean;
    private static instance: LootWindow;
    private newWindow : boolean;

    constructor(props : {}) {
        super(props)
        this.state = {
            cargo : {
                items: []
            }
        }
        this.open = false;
        LootWindow.instance = this;
        this.onOpen = this.onOpen.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.isOpen = this.isOpen.bind(this);
        EventHandler.on(Events.EEventType.OPEN_CARGO_ACK, this.onOpen)
        this.newWindow = true;
    }

    public static getInstance(): LootWindow {
        return LootWindow.instance;
    }

    public closeWindow() {
        this.open = false;
        this.newWindow = false;
        this.setState({cargo: {items: []}});
    }

    public isOpen() {
        return this.open;
    }

    public onOpen(event: Events.OPEN_CARGO_ACK_CONFIG) {
        let obj = GameObjectHandler.getGameObjectsMap().get(event.data.id);
        if(obj != undefined && obj instanceof CShipwreck) {
            this.openWindow(obj.getCargo());
        }
    }

    private openWindow(cargo : ICargo) {
        this.open = true;
        this.newWindow = true;
        this.setState({cargo: cargo});
    }

    render() {
        return (
            <div className="SpaceCargoWindow HasBorder Unselectable PanelBackground BodyText" style={{visibility: this.open ? "visible" : "hidden"}}>
                <LootContainer items={this.state.cargo.items} newWindow={this.newWindow}/>
            </div> 
        );
    }
}