import {IState} from "../../../config/IState";
import {IReducerActivity} from "./reducerActivity";

export const selectActivity = (state: IState): IReducerActivity => state.activity;

export const selectActivityMessage = (state: IState): string => state.activity.message || '';