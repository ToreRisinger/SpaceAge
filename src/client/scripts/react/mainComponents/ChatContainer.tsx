import React from "react";
import { Chat } from "./../../modules/Chat"
import ChatMessage from "./ChatMessage";

export interface ChatProps { chatMessages : Array<Chat.IChatMessage>; }

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