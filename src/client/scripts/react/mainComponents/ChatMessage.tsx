import React from "react";
import { Chat } from "./../../modules/Chat"
import { Colors } from "../../modules/colors/Colors";
import { GlobalDataService } from "../../modules/GlobalDataService";

export interface ChatMessageProps { chatMessage : Chat.IChatMessage; }

export default class ChatMessage extends React.Component<ChatMessageProps, {}> {

    constructor(props : ChatMessageProps) {
        super(props)
    }

    render() {
        const colorStyle = {
            color: this.props.chatMessage.sender == GlobalDataService.getInstance().getCharacterName() ? Colors.RGB.GREEN : Colors.RGB.LIGHT_BLUE
        }
        return (
            <div className="chat_message">
                <b style={colorStyle}>[{this.props.chatMessage.sender}]</b>: {this.props.chatMessage.message}
            </div>
        );
    }
}