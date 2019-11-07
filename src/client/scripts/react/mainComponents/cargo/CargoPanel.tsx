import React from "react";
import CargoContainer from "./CargoContainer";

export default class CargoPanel extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        return (
            <div id="cargo_panel" className="UIComponent">
               <div id="cargo_panel_title" className="Unselectable">Cargo</div>
               <CargoContainer/>
            </div>
        );
   }
}