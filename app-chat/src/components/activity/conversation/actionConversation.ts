import {IMessageInfo} from "../../../utils/utilSocket/IdSocketVerb";
import {Action} from "redux";

export enum TypeActionConversation {
    RECEIVE = "Conversation > Message > Receive",
    SEND = "Conversation > Message > Send"
}

export interface IActionConversation extends Action{
    messageInfo?: IMessageInfo;
    messageIndex?: number;
    type: TypeActionConversation
}

export const actionMessageSent = (messageInfo: IMessageInfo, messageIndex: number): IActionConversation => ({
    messageInfo,
    messageIndex,
    type: TypeActionConversation.SEND
});

export const actionMessageReceive = (messageInfo: IMessageInfo, messageIndex: number): IActionConversation => ({
    messageInfo,
    messageIndex,
    type: TypeActionConversation.RECEIVE
});
