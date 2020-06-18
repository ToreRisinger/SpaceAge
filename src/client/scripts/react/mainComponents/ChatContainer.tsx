import React from "react";
import ChatMessage from "./ChatMessage";
import { IChatMessage } from "../../../../shared/data/IChatMessage";

export interface ChatProps { chatMessages : Array<IChatMessage>; }

export default class ChatContainer extends React.Component<ChatProps, {}> {

    constructor(props : ChatProps) {
        super(props)
    }

    render() {
        return (
            <div id="chat_container">
                {this.props.chatMessages.map((object, i) => <ChatMessage chatMessage={object} key={i} />)}
            </div>
        );
    }
}