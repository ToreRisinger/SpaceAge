import React from "react";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import CombatLogContainer from "./CombatLogContainer";
import { ICombatLogMessage } from "../../../../shared/data/CombatLogInterfaces";
import { IChatMessage } from "../../../../shared/data/IChatMessage";
import { Chat } from "../../modules/Chat";

export interface ChatState { chatMessages : Array<IChatMessage>, combatLogMessages: Array<ICombatLogMessage>, tabSelection: EChatTabSelection}

enum EChatTabSelection {
    CHAT,
    COMBAT
}

export default class ChatWindow extends React.Component<{}, ChatState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            chatMessages: Chat.getChatMessages(),
            combatLogMessages: Chat.getCombatLogMessages(),
            tabSelection: EChatTabSelection.CHAT

        }
        this.onNewChatMessages = this.onNewChatMessages.bind(this);
        this.onSelectChatTab = this.onSelectChatTab.bind(this);
        this.onSelectCombatTab = this.onSelectCombatTab.bind(this);
        EventHandler.on(Events.EEventType.NEW_CHAT_MESSAGES_RECEIVED, this.onNewChatMessages);
    }
    
    onNewChatMessages() {
        this.setState({
            chatMessages: Chat.getChatMessages()
        });
    }

    onSelectChatTab() {
        this.setState({
            tabSelection : EChatTabSelection.CHAT
        })
    }

    onSelectCombatTab() {
        this.setState({
            tabSelection : EChatTabSelection.COMBAT
        })
    }

    render() {
        const chatTabButtonClass = this.state.tabSelection == EChatTabSelection.CHAT ? "SelectedTab" : "";
        const combatTabButtonClass = this.state.tabSelection == EChatTabSelection.COMBAT ? "SelectedTab" : "";
        return (
            <div id="chat_window" className="Panel PanelBackgroundOnHover BodyTextOnHover">
                <div id="chat_tabs_container" className="Unselectable">
                    <div id="chat_tab_button" className={chatTabButtonClass + " ChatTab BackgroundHoverHighlight"} onClick={(e) => this.onSelectChatTab()}>
                        Chat
                    </div>
                    <div id="combat_log_tab_button" className={combatTabButtonClass + " ChatTab BackgroundHoverHighlight"} onClick={(e) => this.onSelectCombatTab()}>
                        Combat
                    </div>
                </div>
                {this.state.tabSelection == EChatTabSelection.CHAT ?
                    <ChatContainer chatMessages={this.state.chatMessages}/>
                    :
                    <CombatLogContainer combatLogMessages={this.state.combatLogMessages}/>
                }   
                <ChatInput/>
            </div>
        );
    }
}