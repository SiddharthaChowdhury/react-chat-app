import {IdMessageType} from "../../../types/Types";

export interface IActivityConversation {
    message: string;
    timestamp: string;
    sender: string
}

export interface IActivityMessages {
    id: string;
    message: string;
    time: string;
    sender: string;
    type: IdMessageType
}