import React from "react";
import { Ship } from "../game_objects/Ship";
import BottomPanel from "./BottomPanel";

export default class App extends React.Component {
    constructor(props : Ship) {
        super(props);
    }
 
    render() {
        return (
            <BottomPanel/>
        );
    }
   }