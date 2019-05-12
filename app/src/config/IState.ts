import {IReducerLoginState} from "../component/login/reducerLogin";
import {IReducerOnlineUsers} from "../component/home/onlineUsers/reducerOnlineUsers";
import {IReducerActivity} from "../component/home/activity/reducerActivity";
import {IReducerErrorMessage} from "../component/errorMessage/reducerErrorMessage";
import {IReducerFriends} from "../component/home/friends/reducerFriends";


export interface IState {
    loginInfo: IReducerLoginState,
    users: IReducerOnlineUsers,
    friends: IReducerFriends,
    activity: IReducerActivity,
    errors: IReducerErrorMessage
}