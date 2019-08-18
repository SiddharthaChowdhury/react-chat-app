import {combineReducers} from "redux";
import {IState} from "./IState";
import reducerApp from "../components/app/reducerApp";
import reducerPeople from "../components/chat/sideNav/people/reducerPeople";

export default combineReducers<IState>({
    appInfo: reducerApp,
    people: reducerPeople,
})