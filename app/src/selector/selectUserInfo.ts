import {IState} from "../config/IState";
import {IAuthUserInfo} from "../types/IUserInfo";

export const selectUserInfo = (state: IState): IAuthUserInfo => state.loginInfo.userInfo!;