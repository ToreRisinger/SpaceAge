import React from "react";

export default class NavigationPanel extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        return (
            <div id="navigation_panel" className="UIComponent">
               <div id="navigation_panel_title">Navigation</div>
            </div>
        );
   }
}