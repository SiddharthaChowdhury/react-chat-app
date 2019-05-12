import {Action} from "redux";
import {IUserInfo} from "../../../types/Types";

export enum TypeActionFriends {
    Response = "Friends > Response",
    Search = "Friends > Search",
    Add = "Friends > Add",
    Update = "Friends > Update",
    Accept = "Friends > Accept",
    Decline = "Friends > Decline",
}

export interface IActionFriends extends Action {
    friendId?: string;
    friendList?: Array<IUserInfo>
    type: TypeActionFriends;
}

export const actionFriendsSendRequest = (friendId: string): IActionFriends => ({
    friendId,
    type: TypeActionFriends.Add
});

export const actionUpdateFriendsList = (friendList: Array<IUserInfo>): IActionFriends => ({
    friendList,
    type: TypeActionFriends.Update
});