import React, { Fragment } from "react";
import NavigationPanel from "./NavigationPanel";
import CargoPanel from "./cargo/CargoPanel";

export default class RightPanel extends React.Component<{}, {}> {

    constructor(props : {}) {
        super(props)
    
    }   

    render() {
        return (
           <div className="RightPanel BodyText HasBorder Unselectable PanelBackground">
               <NavigationPanel/>
               <CargoPanel/>
           </div>
        );
    }

}