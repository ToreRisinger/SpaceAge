import React, {Fragment} from "react";
import { Ship } from "../game_objects/Ship";
import BottomPanel from "./panels/BottomPanel";
import SideMenu from "./panels/SidePanel";

export default class App extends React.Component {
    constructor(props : Ship) {
        super(props);
    }
 
    render() {
        return (
            <Fragment>
                <BottomPanel/>
                <SideMenu/>
            </Fragment>
        );
    }
   }