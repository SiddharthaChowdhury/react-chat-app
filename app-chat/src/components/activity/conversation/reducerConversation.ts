import {IdMessageSource, IMessageInfo} from "../../../utils/utilSocket/IdSocketVerb";
import {IActionConversation, TypeActionConversation} from "./actionConversation";

interface IReducerSourceConversation {
    [id: number]: Array<IMessageInfo>
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
        case TypeActionConversation.SEND:
            return reducerConversationUpdate(state, action);
        default:
            return state;
    }
}

const reducerConversationUpdate = (state: IReducerConversation, {messageInfo, messageIndex}: IActionConversation): IReducerConversation => {
    let userConv = state.user;
    let channelConv = state.channel;

    if(messageInfo!.source === IdMessageSource.Channel_Message) {
        if(messageInfo!.channelId! in channelConv) {
            channelConv[messageIndex!].push(messageInfo!)
        } else {
            channelConv[messageIndex!] = [messageInfo!]
        }
    }

    if(messageInfo!.source === IdMessageSource.User_Message) {
        if(messageInfo!.fromId in userConv) {
            userConv[messageIndex!].push(messageInfo!)
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