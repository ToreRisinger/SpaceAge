import React from "react";
import CargoContainer from "./CargoContainer";
import { Items } from "../../../../../shared/scripts/Items";
import { GlobalData } from "../../../modules/GlobalData";
import { ObjectInterfaces } from "../../../../../shared/scripts/ObjectInterfaces";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/scripts/Events";

export interface CargoPanelState { items : Array<Items.IItem>}

export default class CargoPanel extends React.Component<{}, CargoPanelState> {
   
   private waitForPlayerShipInitTimer : ReturnType<typeof setTimeout> | undefined;
   private eventHandlerWaitTimer : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         items : new Array()
      }
      this.waitForPlayerShipInitTimer = undefined;
      this.waitForPlayerShipInitialization = this.waitForPlayerShipInitialization.bind(this);
      this.eventHandlerRegistration = this.eventHandlerRegistration.bind(this);
      this.onCargoUpdated = this.onCargoUpdated.bind(this);
   }

   componentDidMount() {
      this.waitForPlayerShipInitTimer = setInterval(
         () => this.waitForPlayerShipInitialization(),
         1000
      );
      this.eventHandlerWaitTimer = setInterval(
         () => this.eventHandlerRegistration(),
         1000
      );
   }

   eventHandlerRegistration() {
      if(EventHandler.isInitialized()) {
         EventHandler.on(Events.EEventType.PLAYER_CARGO_UPDATED_EVENT, this.onCargoUpdated)
         if(this.eventHandlerWaitTimer != undefined) {
            clearInterval(this.eventHandlerWaitTimer);
        }
      }
   }

   waitForPlayerShipInitialization() {
      if(GlobalData.playerShip != undefined) {
         this.setState({
            items : GlobalData.playerShip.getCargo().items
         })
         if(this.waitForPlayerShipInitTimer != undefined) {
            clearInterval(this.waitForPlayerShipInitTimer);
        }
      }
   }

   onCargoUpdated(event : Events.PLAYER_CARGO_UPDATED_EVENT_CONFIG) {
      this.setState({
         //@ts-ignore
         items : GlobalData.playerShip.getCargo().items
      })
   }

   render() {
      let shipCargoHoldSize = 0;
      if(GlobalData.playerShip != undefined) {
         shipCargoHoldSize = GlobalData.playerShip.getShipData().stats[ObjectInterfaces.EShipStatType.cargo_hold];
      }

      let cargoHoldSize = 0
      for(let i = 0; i < this.state.items.length; i++) {
         let itemInfo : Items.IItemInfo = Items.getItemInfo(this.state.items[i].itemType);
         cargoHoldSize += this.state.items[i].quantity * itemInfo.size;
      }

      let cargo_panel_title_id = cargoHoldSize >= shipCargoHoldSize ? "cargo_panel_title_cargo_full" : "cargo_panel_title";
      
      return (
         <div id="cargo_panel" className="UIComponent">
            <div id={cargo_panel_title_id} className="Unselectable">Cargo Hold ({cargoHoldSize} m<sup>2</sup>/{shipCargoHoldSize} m<sup>2</sup>)</div>
            <CargoContainer items={this.state.items}/>
         </div>
      );
   }
}