import React from "react";
import { Chat } from "../../modules/Chat"
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";

export interface ChatState { chatMessages : Array<Chat.IChatMessage>; }

export default class ChatWindow extends React.Component<{}, ChatState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            chatMessages: Chat.getChatMessages()
        }
        this.onNewChatMessages = this.onNewChatMessages.bind(this);
        EventHandler.on(Events.EEventType.NEW_CHAT_MESSAGES_RECEIVED, this.onNewChatMessages);       
    }
    
    onNewChatMessages() {
        this.setState({
            chatMessages: Chat.getChatMessages()
        });
    }

    render() {
        return (
            <div id="chat_window" className="UIComponent">
                <ChatContainer chatMessages={this.state.chatMessages}/>
                <ChatInput/>
            </div>
        );
    }
}