import React from "react";
import { Chat } from "../../modules/Chat"
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";
import { ICombatLogMessage } from "../../../../shared/interfaces/ICombatLogMessage";

export interface ChatState { chatMessages : Array<Chat.IChatMessage>, combatLogMessages: Array<ICombatLogMessage>; }

export default class ChatWindow extends React.Component<{}, ChatState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            chatMessages: Chat.getChatMessages(),
            combatLogMessages: Chat.getCombatLogMessages()

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
        console.log(this.state.combatLogMessages);
        return (
            <div id="chat_window" className="UIComponent">
                <ChatContainer chatMessages={this.state.chatMessages}/>
                <ChatInput/>
            </div>
        );
    }
}