import {IState} from "../config/IState";
import {IAuthUserInfo} from "../types/IUserInfo";

export const selectOnline = (state: IState): Array<IAuthUserInfo> => state.users.onlineUsers;