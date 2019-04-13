import {Socket} from "socket.io";

export interface ISocketResponse <TData> {
    error?: boolean;
    errorType?: IdErrorTypes;
    msg: string;
    data?: TData;
}

export interface IPrivateMessageTrigger {
    recipient: any;
    msg: any;
    sender?: any;
}

export interface IPrivateMessageForward {
    msg: any;
    sender?: any;
}

export interface ISocketUsers {
    [index: string]: Socket
}

export interface ISocket extends Socket{
    [index: string]: any
}
export const enum IdErrorTypes {
    USER_EXISTS = 'USER_EXISTS',
    USER_OFFLINE = 'USER_OFFLINE',
}

export const enum IdSocketVerb {
    CONNECTION = 'CONNECTION',
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    ONLINE_USERS = 'ONLINE_USERS',
    PRIVATE_MSG_TRIGGER = 'PRIVATE_MSG_TRIGGER',
    PRIVATE_MSG_FORWARD = 'PRIVATE_MSG_FORWARD',
}

