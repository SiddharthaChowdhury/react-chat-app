import {combineEpics} from "redux-observable";
import {Action} from "redux";
import {IState} from "./IState";
import { epicUsers } from "../features/users/epicUsers";
import { epicLogin } from "../features/auth/epicAuth";
import { epicConversation } from "../features/conversation/epicConversation";

export default combineEpics<Action<any>, Action<any>, IState>(
    epicUsers,
    epicLogin,
    epicConversation,
);