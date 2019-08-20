import {combineEpics} from "redux-observable";
import {Action} from "redux";
import {IState} from "./IState";
import {epicLogin} from "../components/app/epicApp";
import {epicPeople} from "../components/chat/sideNav/people/epicPeople";
import {epicConversation} from "../components/activity/conversation/epicConversation";

export default combineEpics<Action<any>, Action<any>, IState>(
    epicLogin,
    epicPeople,
    epicConversation,
);