import {IState} from "../config/IState";
import {IReducerActivity} from "../component/home/activity/reducerActivity";

export const selectActivity = (state: IState): IReducerActivity => state.activity;

export const selectActivityMessage = (state: IState): string => state.activity.message || '';