import {IState} from "../config/IState";

export const selectApp = (state: IState): boolean => !!state.loginInfo.isLoggedIn;