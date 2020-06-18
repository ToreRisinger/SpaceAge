import React from "react";
import CargoContainer from "./CargoContainer";
import { ItemInfo } from "../../../../../shared/data/item/ItemInfo";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/util/Events";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { IItem } from "../../../../../shared/data/item/IItem";
import { EStatType } from "../../../../../shared/data/stats/EStatType";

export interface CargoPanelState { items : Array<IItem>}

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
      let playerShip = GlobalDataService.getInstance().getPlayerShip();
      if(playerShip != undefined) {
         this.setState({
            items : playerShip.getCargo().items
         })
         if(this.waitForPlayerShipInitTimer != undefined) {
            clearInterval(this.waitForPlayerShipInitTimer);
        }
      }
   }

   onCargoUpdated(event : Events.PLAYER_CARGO_UPDATED_EVENT_CONFIG) {
      this.setState({
         items : GlobalDataService.getInstance().getPlayerShip().getCargo().items
      })
   }

   render() {
      let playerShip = GlobalDataService.getInstance().getPlayerShip();
      let shipCargoHoldSize = 0;
      if(playerShip != undefined) {
         shipCargoHoldSize = playerShip.getStat(EStatType.cargo_hold);
      }

      let cargoHoldSize = 0
      for(let i = 0; i < this.state.items.length; i++) {
         let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(this.state.items[i].itemType);
         cargoHoldSize += this.state.items[i].quantity * itemInfo.size;
      }

      let cargo_panel_title_id = cargoHoldSize >= shipCargoHoldSize ? "cargo_panel_title_cargo_full" : "cargo_panel_title";
      
      return (
         <div id="cargo_panel" className="Unselectable HasBorder PanelBackground BodyText">
            <div id={cargo_panel_title_id} className="TitleText">Cargo Hold ({cargoHoldSize} m<sup>2</sup>/{shipCargoHoldSize} m<sup>2</sup>)</div>
            <CargoContainer items={this.state.items}/>
         </div>
      );
   }
}