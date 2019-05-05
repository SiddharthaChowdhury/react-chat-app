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
    timestamp?: string;
}

export interface ISocketUsers {
    [index: string]: Socket
}

export interface ISocket extends Socket{
    [index: string]: any
}
export enum IdErrorTypes {
    USER_EXISTS = 'USER_EXISTS',
    USER_OFFLINE = 'USER_OFFLINE',
}

export enum IdSocketVerb {
    connect = 'connect',
    disconnect= 'disconnect',
    register = 'register',
    login = 'login',
    online_users = 'online_users',
    private_msg_trigger = 'private_msg_trigger',
    private_msg_forward = 'private_msg_forward',
}

