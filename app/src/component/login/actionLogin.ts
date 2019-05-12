import {Action} from "redux";
import {IAuthUserInfo} from "../../types/IUserInfo";

export enum TypeActionLogin {
    Request = "Login > Request",
    Response = "Login > Response"
}

export interface IActionLogin extends Action{
    userInfo?: IAuthUserInfo;
    isLoggedIn?: boolean;
    type: TypeActionLogin
}

export const actionLoginRequest = (userInfo: IAuthUserInfo): IActionLogin => ({
    userInfo,
    type: TypeActionLogin.Request
});

export const actionLoginResponse = (userInfo?: IAuthUserInfo, isLoggedIn?: boolean): IActionLogin => ({
    userInfo,
    isLoggedIn,
    type: TypeActionLogin.Response
});
