import {Action} from "redux";
import {IUserInfo} from "../../../types/Types";

export enum TypeActionFriends {
    Response = "Friends > Response",
    Search = "Friends > Search",
    Add = "Friends > Add",
    UpdateFriendlist = "Friends > Update",
    Accept = "Friends > Accept",
    Decline = "Friends > Decline",
}

export interface IActionFriends extends Action {
    friend?: IUserInfo;
    friendList?: Array<IUserInfo>
    type: TypeActionFriends;
}

export const actionFriendsSendRequest = (friend: IUserInfo): IActionFriends => ({
    friend,
    type: TypeActionFriends.Add
});

export const actionUpdateFriendsList = (friendList: Array<IUserInfo>): IActionFriends => ({
    friendList,
    type: TypeActionFriends.UpdateFriendlist
});

export const actionUpdateFriendsSearch = (friendList: Array<IUserInfo>): IActionFriends => ({
    friendList,
    type: TypeActionFriends.Search
});