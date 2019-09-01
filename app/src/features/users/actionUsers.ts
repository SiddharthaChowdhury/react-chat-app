import { Action } from "redux";
import { IUserInfo } from "../../types/IUser";


export enum TypeActionUsers {
    UserListRequest = "User > List > Request",
    UserListResponse = "User > List > Response",
    UserListComplete = "User > List > Complete",

    UserPendingMsgUpdate = "User > Pending_msg > Update",
    UserPendingMsgReset = "User > Pending_msg > Reset",

    UserOnlineStatusUpdate = "User > Online_status > Update",
}

export interface IActionUsers extends Action{
    onlineUserIds?: Array<string>;
    userId?: number;
    userList?: Array<IUserInfo>;
    type: TypeActionUsers
}

export const actionUsersRequest = (): IActionUsers => ({
    type: TypeActionUsers.UserListRequest
});

export const actionUsersResponse = (userList: Array<IUserInfo>): IActionUsers => ({
    userList,
    type: TypeActionUsers.UserListResponse
});

export const actionUsersComplete = (): IActionUsers => ({
    type: TypeActionUsers.UserListComplete
});

export const actionUsersPendingUpdate = (userId: number): IActionUsers => ({
    userId,
    type: TypeActionUsers.UserPendingMsgUpdate
});

export const actionUsersPendingReset = (userId: number): IActionUsers => ({
    userId,
    type: TypeActionUsers.UserPendingMsgReset
});

export const actionUsersOnlineUserStatusUpdate = (onlineUserIds: Array<string>): IActionUsers => ({
    onlineUserIds,
    type: TypeActionUsers.UserOnlineStatusUpdate
});
