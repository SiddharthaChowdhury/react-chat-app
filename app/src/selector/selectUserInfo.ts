import {IState} from "../config/IState";
import {IUserInfo} from "../types/IUserInfo";

export const selectUserInfo = (state: IState): IUserInfo => state.loginInfo.userInfo!;