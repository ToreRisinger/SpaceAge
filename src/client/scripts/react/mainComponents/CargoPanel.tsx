import React from "react";

export default class CargoPanel extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        return (
            <div id="cargo_panel" className="UIComponent">
               <div id="cargo_panel_title">Cargo</div>
            </div>
        );
   }
}