import React, {Fragment} from "react";
import { Ship } from "../game_objects/Ship";
import BottomPanel from "./mainComponents/BottomPanel";
import SideMenu from "./mainComponents/SidePanel";
import NavigationPanel from "./mainComponents/NavigationPanel";
import Chat from "./mainComponents/ChatWindow";
import CargoPanel from "./mainComponents/CargoPanel";
import RulerPanel from "./mainComponents/RulerPanel";

export default class App extends React.Component {
    constructor(props : Ship) {
        super(props);
    }
 
    render() {
        return (
            <Fragment>
                <BottomPanel/>
                <SideMenu/>
                <Chat/>
                <NavigationPanel/>
                <CargoPanel/>
                <RulerPanel/>
            </Fragment>
        );
    }
   }