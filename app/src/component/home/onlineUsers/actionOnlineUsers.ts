import {Action} from "redux";

export enum TypeActionOnlineUsers {
    Update = "OnlineUsers > Update",
}

export interface IActionOnlineUsers extends Action {
    onlineUsers?: Array<string>
    type: TypeActionOnlineUsers
}

export const actionOnlineUsersUpdate = (onlineUsers: Array<string>): IActionOnlineUsers => ({
    onlineUsers,
    type: TypeActionOnlineUsers.Update
});
