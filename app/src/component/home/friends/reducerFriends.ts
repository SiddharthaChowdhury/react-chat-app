import {IUserInfo} from "../../../types/Types";
import {IActionFriends, TypeActionFriends} from "./actionFriends";

export interface IReducerFriends {
    friends: Array<IUserInfo>;
    pendingFriends: Array<IUserInfo>;
}

const initialFriendsState: IReducerFriends = {
    friends: [],
    pendingFriends: [],
};

export default (state: IReducerFriends = initialFriendsState, action: IActionFriends) => {
    switch (action.type) {
        case TypeActionFriends.Update:
            return reducerUpdateFriendsList(state, action);
        default:
            return state;
    }
}

const reducerUpdateFriendsList = (state: IReducerFriends, action: IActionFriends): IReducerFriends => ({
    ...state,
    friends: [...action.friendList!]
});
