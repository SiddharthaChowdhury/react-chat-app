import {Action} from "redux";
import {IAuthUserInfo} from "../../../types/IUserInfo";

export enum TypeActionOnlineUsers {
    Update = "OnlineUsers > Update",
}

export interface IActionOnlineUsers extends Action {
    onlineUsers?: Array<IAuthUserInfo>
    type: TypeActionOnlineUsers
}

export const actionOnlineUsersUpdate = (onlineUsers: Array<IAuthUserInfo>): IActionOnlineUsers => ({
    onlineUsers,
    type: TypeActionOnlineUsers.Update
});
