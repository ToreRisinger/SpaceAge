import React from "react";
import { Chat } from "./../../modules/Chat"

export interface ChatMessageProps { chatMessage : Chat.IChatMessage; }

export default class ChatMessage extends React.Component<ChatMessageProps, {}> {

    constructor(props : ChatMessageProps) {
        super(props)
    }

    render() {
        return (
            <div className="chat_message">
                <b> {this.props.chatMessage.sender}</b>: {this.props.chatMessage.message}
            </div>
        );
    }
}