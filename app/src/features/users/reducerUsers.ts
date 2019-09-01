import {IUserInfo} from "../../types/IUser";
import {IActionUsers, TypeActionUsers} from "./actionUsers";

export interface IUserDetails extends IUserInfo {
    pendingMessageCount?: number;
    isOnline?: boolean
}

export interface IAllUsers {[key: number]: IUserDetails}

export interface IReducerUsers {
    allUsers: IAllUsers;
}

const initial: IReducerUsers = {
    allUsers: {}
}

export default (state: IReducerUsers = initial, action: IActionUsers) => {
    switch(action.type) {
        case TypeActionUsers.UserListResponse:
            return {
                ...state,
                allUsers: convertUserArrayToObj(action.userList || [])
            };
        case TypeActionUsers.UserPendingMsgUpdate:
            return reducerUpdatePending(state, action);
        case TypeActionUsers.UserPendingMsgReset:
            return reducerUpdatePending(state, action, true);
        case TypeActionUsers.UserOnlineStatusUpdate:
            return reducerUpdateOnlineUsers(state, action);
        default:
            return state;
    }
}

const convertUserArrayToObj = (userList: Array<IUserInfo>): IAllUsers => {
    const userObj: IAllUsers = {};
    userList.forEach((user: IUserInfo) => {
        userObj[user.id] = user;
    });

    return userObj
};


const  reducerUpdatePending = (state: IReducerUsers, {userId}: IActionUsers, reset: boolean = false): IReducerUsers => {
    if(!userId || !state.allUsers[userId]) return state;

    const allUsers = {...state.allUsers};
    if(reset) {
        allUsers[userId].pendingMessageCount = 0;
    } else {
        const pendingCount = allUsers[userId].pendingMessageCount || 0;
        allUsers[userId].pendingMessageCount = pendingCount + 1;
    }

    return {
        ...state,
        allUsers,
    }
};

const reducerUpdateOnlineUsers = (state: IReducerUsers, {onlineUserIds}: IActionUsers): IReducerUsers => {
    const updatedUsers = {...state.allUsers};

    for(let id in updatedUsers) {
        updatedUsers[id].isOnline = onlineUserIds!.indexOf(id) > -1;
    }

    return {
        allUsers: updatedUsers
    };
};
