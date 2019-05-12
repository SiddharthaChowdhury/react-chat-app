export interface ISocketResponse <TData> {
    error?: boolean;
    errorType?: IdErrorTypes;
    msg: string;
    data?: TData;
}

export interface IUserInfo {
    id: number;
    name?: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPrivateMessageTrigger {
    id?: string;
    recipient: any;
    msg: any;
    sender?: any;
    type: IdMessageType
}

export interface IPrivateMessageForward {
    id: string;
    msg: any;
    sender?: any;
    timestamp?: string;
    type: IdMessageType
}

export enum IdErrorTypes {
    USER_EXISTS = 'USER_EXISTS',
    USER_OFFLINE = 'USER_OFFLINE',
}

export enum IdSocketVerb {
    connect = 'connect',
    disconnect = 'disconnect',
    register = 'register',
    login = 'login',
    online_users = 'online_users',
    private_msg_trigger = 'private_msg_trigger',
    private_msg_forward = 'private_msg_forward',
}

export enum IdMessageType {
    text = 'text',
    audio = 'audio',
    video = 'video',
    picture = 'picture',
    other = 'other'
}