import {IState} from "../config/IState";
import {IUserInfo} from "../types/Types";

export const selectFriends = (state: IState): Array<IUserInfo> => state.friends.friends;