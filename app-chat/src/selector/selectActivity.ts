import {IState} from "../setup/IState";
import {IReducerActivity} from "../components/activity/reducerActivity";
import {IReducerActiveView} from "../components/activity/activeView/reducerActiveView";

export const selectActivity = (state: IState): IReducerActivity => state.activity;

export const selectActivityActiveView = (state: IState): IReducerActiveView => selectActivity(state).activeView;