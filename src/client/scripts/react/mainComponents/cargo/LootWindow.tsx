import React, { Fragment } from "react";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/util/Events";
import { GameObjectHandler } from "../../../modules/GameObjectHandler";
import { CContainer } from "../../../game_objects/CContainer";
import LootContainer from "./LootContainer";

export interface CargoPanelState { container : CContainer | undefined}

export default class LootWindow extends React.Component<{}, CargoPanelState> {

    private open: boolean;
    private static instance: LootWindow;

    private selectedItems: Set<number>;

    constructor(props : {}) {
        super(props)
        this.state = {
            container : undefined
        }
        this.selectedItems = new Set();
        this.open = false;
        LootWindow.instance = this;
        this.onOpen = this.onOpen.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.isOpen = this.isOpen.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTakeItems = this.onTakeItems.bind(this);
        EventHandler.on(Events.EEventType.OPEN_CARGO_ACK, this.onOpen);
    }

    public static getInstance(): LootWindow {
        return LootWindow.instance;
    }

    public closeWindow() {
        let event: Events.CLOSE_CARGO_CONFIG = {
            eventId: Events.EEventType.CLOSE_CARGO,
            data: { }
        }
        EventHandler.pushEvent(event);
        this.open = false;
        this.setState({container: undefined});
    }

    public isOpen() {
        return this.open;
    }

    public onOpen(event: Events.OPEN_CARGO_ACK_CONFIG) {
        this.selectedItems.clear();
        let obj = GameObjectHandler.getGameObjectsMap().get(event.data.id);
        if(obj != undefined && obj instanceof CContainer) {
            this.openWindow(obj);
        }
    }

    public onTakeItems() {
        if(this.state.container != undefined) {
            let event : Events.TAKE_ITEM_REQUEST_CONFIG = {
                eventId: Events.EEventType.TAKE_ITEM_REQUEST,
                data: {
                    indexes: Array.from(this.selectedItems),
                    cargoId: this.state.container.getId()
                }
            }
            EventHandler.pushEvent(event);
        }
        this.closeWindow();
    }

    onClick(index: number) {
        if(this.selectedItems.has(index)) {
            this.selectedItems.delete(index);
        } else {
            this.selectedItems.add(index);
        }
        this.forceUpdate();
    }

    private openWindow(container : CContainer) {
        this.open = true;
        this.setState({container: container});
    }

    render() {
        return (
            <Fragment>
                {this.state.container != undefined ?
                    <div className="LootWindow HasBorder Unselectable PanelBackground BodyText" style={{visibility: this.open ? "visible" : "hidden"}}>
                        <div className="LootWindowContainerWrapper">
                            <LootContainer items={this.state.container.getCargo().items} onClick={this.onClick} selectedItems={this.selectedItems}/>
                        </div>
                        <div className="LootWindowButtonWrapper">
                            <div className="Button" onClick={this.onTakeItems}>
                                Take      
                            </div>
                        </div>
                    </div> 
                    : ""
                }
            </Fragment>
        );
    }
}