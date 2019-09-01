import { Epic, combineEpics } from "redux-observable";
import { Action } from "redux";
import { IState } from "../../setup/IState";
import { epicAuthListUsers } from "./epic/epicAuthListUsers";
import { epicAuthSocketSignIn } from "./epic/epicAuthSocketSignIn";
import { epicCompanyUsers } from "./epic/epicCompanyUsers";

export const epicLogin: Epic<Action, Action, IState> = combineEpics(
    epicAuthListUsers,
    epicAuthSocketSignIn,
    epicCompanyUsers,
)