import {combineEpics} from "redux-observable";
import {Action} from "redux";
import {IState} from "./IState";

export default combineEpics<Action<any>, Action<any>, IState>(
    // epicCheckLogin,
);