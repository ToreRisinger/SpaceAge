export enum EEventType {
    /*
        CLIENT EVENTS
    */
    PLAYER_LOAD_EVENT,

    //Player events
    PLAYER_CONNECTED_EVENT,
    PLAYER_DISCONNECTED_EVENT,
    ALL_PLAYER_POSITIONS_EVENT,

    //Chat events
    CHAT_MESSAGE_EVENT,
    CHAT_SERVER_MESSAGE_EVENT,

    //Game logic events
    PLAYER_SET_NEW_DESTINATION_EVENT

    /*
        SERVER EVENTS
    */
}