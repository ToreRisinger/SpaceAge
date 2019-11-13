import React from "react";
import CargoContainer from "./CargoContainer";
import { Items } from "../../../../../shared/scripts/Items";
import { GlobalData } from "../../../modules/GlobalData";

export interface CargoPanelState { items : Array<Items.IItem>}

export default class CargoPanel extends React.Component<{}, CargoPanelState> {
   
   private waitForPlayerShipInitTimer : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         items : new Array()
      }
      this.waitForPlayerShipInitTimer = undefined;
      this.waitForPlayerShipInitialization = this.waitForPlayerShipInitialization.bind(this);
   }

   componentDidMount() {
      this.waitForPlayerShipInitTimer = setInterval(
         () => this.waitForPlayerShipInitialization(),
         1000
      );
   }

   waitForPlayerShipInitialization() {
      if( GlobalData.playerShip != undefined) {
         this.setState({
            items : GlobalData.playerShip.getShipData().cargo.items
         })
         if(this.waitForPlayerShipInitTimer != undefined) {
            clearInterval(this.waitForPlayerShipInitTimer);
        }
      }
   }

   render() {
        return (
            <div id="cargo_panel" className="UIComponent">
               <div id="cargo_panel_title" className="Unselectable">Cargo</div>
               <CargoContainer items={this.state.items}/>
            </div>
        );
   }
}