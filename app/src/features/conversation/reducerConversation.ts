import { IMessageInfo, IdMessageSource } from "../../types/IMessage";
import { IActionConversation, TypeActionConversation } from "./actionConverstion";

interface IReducerSourceConversation {
    [id: string]: Array<IMessageInfo>
}

export interface IReducerConversation {
    user: IReducerSourceConversation;
    channel: IReducerSourceConversation;
}

const initialConversationState = {
    user: {},
    channel: {}
};

export default (state: IReducerConversation = initialConversationState, action: IActionConversation): IReducerConversation => {
    switch (action.type) {
        case TypeActionConversation.RECEIVE:
            return reducerConversationUpdate(state, action);
        default:
            return state;
    }
}

const reducerConversationUpdate = (state: IReducerConversation, {messageInfo, messageIndex}: IActionConversation): IReducerConversation => {
    let userConv = state.user;
    let channelConv = state.channel;

    if(messageInfo!.source === IdMessageSource.Channel_Message) {
        if(messageIndex! in channelConv) {
            channelConv[messageIndex!].push(messageInfo!)
        } else {
            channelConv[messageIndex!] = [messageInfo!]
        }
    }

    if(messageInfo!.source === IdMessageSource.User_Message) {
        if(messageIndex! in userConv) {
            userConv[messageIndex!] = [...userConv[messageIndex!], messageInfo!]
        } else {
            userConv[messageIndex!] = [messageInfo!]
        }
    }

    return {
        ...state,
        user: {...userConv},
        channel: {...channelConv}
    }
}