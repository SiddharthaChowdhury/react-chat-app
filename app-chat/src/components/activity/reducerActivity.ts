import reducerActiveView, {IReducerActiveView} from "./activeView/reducerActiveView";
import {combineReducers} from "redux";
import reducerConversation, {IReducerConversation} from "./conversation/reducerConversation";

export interface IReducerActivity {
    activeView: IReducerActiveView;
    conversation: IReducerConversation;
}

export default combineReducers<IReducerActivity>({
    activeView: reducerActiveView,
    conversation: reducerConversation
})