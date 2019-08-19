import reducerActiveView, {IReducerActiveView} from "./activeView/reducerActiveView";
import {combineReducers} from "redux";

export interface IReducerActivity {
    activeView: IReducerActiveView
}

export default combineReducers<IReducerActivity>({
    activeView: reducerActiveView
})