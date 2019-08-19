export interface ISocketResponse {
    error?: boolean;
    msg: string;
    data?: any;
}

export enum IdSocketKey {
    registerUser = "register"
}