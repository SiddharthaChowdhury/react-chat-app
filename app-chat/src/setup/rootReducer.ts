import {combineReducers} from "redux";
import {IState} from "./IState";
import reducerApp from "../components/app/reducerApp";

export default combineReducers<IState>({
    appInfo: reducerApp
})