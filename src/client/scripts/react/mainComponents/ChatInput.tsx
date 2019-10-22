import React from "react";
import { Chat } from "./../../modules/Chat"

export default class ChatInput extends React.Component<{}, {}> {

    constructor(props : {}) {
        super(props)
    }

    render() {
        return (
            <input type="text" id="chat_input"></input>
        );
    }
}