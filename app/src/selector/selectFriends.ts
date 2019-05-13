import {IState} from "../config/IState";
import {IUserInfo} from "../types/Types";

export const selectFriends = (state: IState): Array<IUserInfo> => state.friends.friends;

export const selectFriendsSearch = (state: IState): Array<IUserInfo> => state.friends.searchedFriends;

export const selectFriendSelected = (state: IState): IUserInfo | undefined => state.friends.selectedFriend;