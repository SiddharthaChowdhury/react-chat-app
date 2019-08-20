export interface ISocketResponse {
    error?: boolean;
    msg: string;
    data?: any;
}

export enum IdMessageSource {
    User_Message = "User_Message",
    Channel_Message = "Channel_Message"
}

export interface IMessageInfo {
    channelId?: number;
    fromId: number;
    message: string;
    createdAt: string;
    source: IdMessageSource;
}

export enum IdSocketKey {
    registerUser = "register",
    message = "message"
}