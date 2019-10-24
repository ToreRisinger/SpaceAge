import React from "react";
import { Chat } from "../../modules/Chat"
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

export interface ChatState { chatMessages : Array<Chat.IChatMessage>; }

export default class ChatWindow extends React.Component<{}, ChatState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
        super(props)
        this.state = {
            chatMessages: Chat.getChatMessages()
        }
        this.timerID = undefined;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }
    
    tick() {
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