import {IState} from "../config/IState";

export const selectOnline = (state: IState): Array<string> => state.users.onlineUsers;