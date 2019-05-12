import {combineReducers} from "redux";
import reducerLogin from "../component/login/reducerLogin";
import reducerOnlineUsers from "../component/home/onlineUsers/reducerOnlineUsers";
import {IState} from "./IState";
import reducerActivity from "../component/home/activity/reducerActivity";
import reducerError from "../component/errorMessage/reducerErrorMessage";
import reducerFriends from "../component/home/friends/reducerFriends";

export default combineReducers<IState>({
    activity: reducerActivity,
    errors: reducerError,
    friends: reducerFriends,
    loginInfo: reducerLogin,
    users: reducerOnlineUsers,
})