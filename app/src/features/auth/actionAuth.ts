import { Action } from "redux";
import { IUserInfo } from "../../types/IUser";


export enum TypeActionAuth {
    SIGN_IN_REQUEST = "Auth > SignIn > Request",
    SIGN_IN_RESPONSE = "Auth > SignIn > Response",
    SIGN_IN_COMPLETE = "Auth > SignIn > Complete",
    SIGN_IN_ERROR = "Auth > SignIn > Error",

    SOCKET_STATUS = "Auth > Socket > Status"
}

export interface IActionAuth extends Action{
    socketStatus?: boolean;
    userInfo?: IUserInfo;
    type: TypeActionAuth;
}

export const actionAuthSignInRequest = (userInfo: IUserInfo):IActionAuth => ({
    userInfo,
    type: TypeActionAuth.SIGN_IN_REQUEST
});

export const actionAuthSignInResponse = (userInfo: IUserInfo):IActionAuth => ({
    userInfo,
    type: TypeActionAuth.SIGN_IN_RESPONSE
});

export const actionAuthSignInComplete = ():IActionAuth => ({
    type: TypeActionAuth.SIGN_IN_COMPLETE
});

export const actionAuthSignInError = ():IActionAuth => ({
    type: TypeActionAuth.SIGN_IN_ERROR
});

export const actionAuthSetSocketStatus = (status: boolean):IActionAuth => ({
    socketStatus: status,
    type: TypeActionAuth.SOCKET_STATUS
});