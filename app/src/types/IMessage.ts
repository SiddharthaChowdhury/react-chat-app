export interface IMessageInfo {
    channelId?: string;
    fromId: number;
    toId?: number;
    message: IMessage;
    createdAt: number;
    source: IdMessageSource;
    companyId?: number;
    selfEcho?: boolean;
}

export enum IdMessageSource {
    User_Message = "User_Message",
    Channel_Message = "Channel_Message"
}

export interface IMessage {
    text?: string;
    imageLink?: string;
    fileLink?: string;
    webLink?: string;
}