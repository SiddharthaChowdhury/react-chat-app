import {IActionOnlineUsers, TypeActionOnlineUsers} from "./actionOnlineUsers";

export interface IReducerOnlineUsers {
    onlineUsers: Array<string>
}

const initialOnlineUsersState: IReducerOnlineUsers = {
    onlineUsers: []
};

export default (state: IReducerOnlineUsers = initialOnlineUsersState, action: IActionOnlineUsers) => {
    switch (action.type) {
        case TypeActionOnlineUsers.Update:
            return reducerOnlineUsersUpdate(state, action);
        default:
            return state;
    }
}

const reducerOnlineUsersUpdate = (state: IReducerOnlineUsers, action: IActionOnlineUsers): IReducerOnlineUsers => {
    const {onlineUsers} = action;
    return ({
        onlineUsers: onlineUsers || []
    })
};
