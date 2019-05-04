import {combineReducers} from "redux";
import reducerLogin from "../component/login/reducerLogin";
import reducerOnlineUsers from "../component/home/onlineUsers/reducerOnlineUsers";
import {IState} from "./IState";
import reducerActivity from "../component/home/activity/reducerActivity";
import reducerError from "../component/errorMessage/reducerErrorMessage";

export default combineReducers<IState>({
    loginInfo: reducerLogin,
    users: reducerOnlineUsers,
    activity: reducerActivity,
    errors: reducerError,
})