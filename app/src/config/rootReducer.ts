import {combineReducers} from "redux";
import reducerLogin from "../component/login/reducerLogin";
import reducerOnlineUsers from "../component/home/onlineUsers/reducerOnlineUsers";
import {IState} from "./IState";

export default combineReducers<IState>({
    loginInfo: reducerLogin,
    users: reducerOnlineUsers,
})