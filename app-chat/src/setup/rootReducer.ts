import {combineReducers} from "redux";
import {IState} from "./IState";
import reducerApp from "../components/app/reducerApp";
import reducerPeople from "../components/chat/sideNav/people/reducerPeople";
import reducerModal from "../generic/modal/reducerModal";
import reducerActivity from "../components/activity/reducerActivity";

export default combineReducers<IState>({
    appInfo: reducerApp,
    people: reducerPeople,
    modal: reducerModal,
    activity: reducerActivity
})