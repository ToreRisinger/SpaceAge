import React from "react";

export default class ChatInput extends React.Component<{}, {}> {

    constructor(props : {}) {
        super(props)
    }

    render() {
        return (
            <input type="text" id="chat_input" autoComplete="off"></input>
        );
    }
}