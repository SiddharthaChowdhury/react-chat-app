import {Action} from "redux";

export enum TypeActionFriends {
    Response = "Friends > Response",
    Search = "Friends > Search",
    Add = "Friends > Add",
    Accept = "Friends > Accept",
    Decline = "Friends > Decline",
}

export interface IActionOnlineUsers extends Action {
    friendId?: string;
    type: TypeActionFriends;
}

export const actionFriendsSendRequest = (friendId: string): IActionOnlineUsers => ({
    friendId,
    type: TypeActionFriends.Add
});