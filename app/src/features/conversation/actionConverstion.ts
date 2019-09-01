import {Action} from "redux";
import { IMessageInfo } from "../../types/IMessage";

export enum TypeActionConversation {
    RECEIVE = "Conversation > Message > Receive",
    SEND = "Conversation > Message > Send",

    END = "Message > Send > Initiated"
}

export interface IActionConversation extends Action{
    messageInfo?: IMessageInfo;
    messageIndex?: number | string;
    type: TypeActionConversation
}

export const actionMessageSend = (messageInfo: IMessageInfo, toId: number | string): IActionConversation => ({
    messageInfo,
    messageIndex: toId,
    type: TypeActionConversation.SEND
});

export const actionMessageReceive = (messageInfo: IMessageInfo, fromId: number | string): IActionConversation => ({
    messageInfo,
    messageIndex: fromId,
    type: TypeActionConversation.RECEIVE
});

export const actionMessageEnd = (): IActionConversation => ({
    type: TypeActionConversation.END
})