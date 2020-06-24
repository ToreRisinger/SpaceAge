import React, { Fragment } from "react";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/util/Events";
import { GameObjectHandler } from "../../../modules/GameObjectHandler";
import { CShipwreck } from "../../../game_objects/CShipwreck";
import LootContainer from "./LootContainer";

export interface CargoPanelState { shipwreck : CShipwreck | undefined}

export default class LootWindow extends React.Component<{}, CargoPanelState> {

    private open: boolean;
    private static instance: LootWindow;

    private selectedItems: Set<number>;

    constructor(props : {}) {
        super(props)
        this.state = {
            shipwreck : undefined
        }
        this.selectedItems = new Set();
        this.open = false;
        LootWindow.instance = this;
        this.onOpen = this.onOpen.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.isOpen = this.isOpen.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTakeItems = this.onTakeItems.bind(this);
        this.onTakeItemsSuccess = this.onTakeItemsSuccess.bind(this);
        EventHandler.on(Events.EEventType.OPEN_CARGO_ACK, this.onOpen);
        EventHandler.on(Events.EEventType.TAKE_ITEM_ACK, this.onTakeItemsSuccess);
    }

    public static getInstance(): LootWindow {
        return LootWindow.instance;
    }

    public onTakeItemsSuccess(event: Events.TAKE_ITEM_ACK_CONFIG) {
        if(this.state.shipwreck != undefined && event.data.cargoId == this.state.shipwreck.getId()) {
            this.state.shipwreck.setCargo(event.data.cargo);
            this.setState({shipwreck: this.state.shipwreck});
        }
    }

    public closeWindow() {
        this.open = false;
        this.setState({shipwreck: undefined});
    }

    public isOpen() {
        return this.open;
    }

    public onOpen(event: Events.OPEN_CARGO_ACK_CONFIG) {
        this.selectedItems.clear();
        let obj = GameObjectHandler.getGameObjectsMap().get(event.data.id);
        if(obj != undefined && obj instanceof CShipwreck) {
            this.openWindow(obj);
        }
    }

    public onTakeItems() {
        if(this.state.shipwreck != undefined) {
            let event : Events.TAKE_ITEM_REQUEST_CONFIG = {
                eventId: Events.EEventType.TAKE_ITEM_REQUEST,
                data: {
                    indexes: Array.from(this.selectedItems),
                    cargoId: this.state.shipwreck.getId()
                }
            }
            EventHandler.pushEvent(event);
        }
    }

    onClick(index: number) {
        if(this.selectedItems.has(index)) {
            this.selectedItems.delete(index);
        } else {
            this.selectedItems.add(index);
        }
        this.forceUpdate();
    }

    private openWindow(shipwreck : CShipwreck) {
        this.open = true;
        this.setState({shipwreck: shipwreck});
    }

    render() {
        return (
            <Fragment>
                {this.state.shipwreck != undefined ?
                    <div className="LootWindow HasBorder Unselectable PanelBackground BodyText" style={{visibility: this.open ? "visible" : "hidden"}}>
                        <div className="LootWindowContainerWrapper">
                            <LootContainer items={this.state.shipwreck.getCargo().items} onClick={this.onClick} selectedItems={this.selectedItems}/>
                        </div>
                        <div className="Button" onClick={this.onTakeItems}>
                            Take      
                        </div>
                    </div> 
                    : ""
                }
            </Fragment>
        );
    }
}