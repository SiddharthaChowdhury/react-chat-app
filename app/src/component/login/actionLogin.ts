import {Action} from "redux";
import {IUserInfo} from "../../types/IUserInfo";

export enum TypeActionLogin {
    Request = "Login > Request",
    Response = "Login > Response"
}

export interface IActionLogin extends Action{
    userInfo?: IUserInfo;
    isLoggedIn?: boolean;
    type: TypeActionLogin
}

export const actionLoginRequest = (userInfo: IUserInfo): IActionLogin => ({
    userInfo,
    type: TypeActionLogin.Request
});

export const actionLoginResponse = (userInfo?: IUserInfo, isLoggedIn?: boolean): IActionLogin => ({
    userInfo,
    isLoggedIn,
    type: TypeActionLogin.Response
});
