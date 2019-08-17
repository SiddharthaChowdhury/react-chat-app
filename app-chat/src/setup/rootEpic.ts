import {combineEpics} from "redux-observable";
import {Action} from "redux";
import {IState} from "./IState";
import {epicLogin} from "../components/app/epicApp";

export default combineEpics<Action<any>, Action<any>, IState>(
    epicLogin,
);