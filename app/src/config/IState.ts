import {IReducerLoginState} from "../component/login/reducerLogin";
import {IReducerOnlineUsers} from "../component/home/onlineUsers/reducerOnlineUsers";


export interface IState {
    loginInfo: IReducerLoginState,
    users: IReducerOnlineUsers,
}