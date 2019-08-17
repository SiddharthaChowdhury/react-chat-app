import {IState} from "../setup/IState";
import {IReducerApp} from "../components/app/reducerApp";

export const selectApp = (state: IState): IReducerApp => state.appInfo;