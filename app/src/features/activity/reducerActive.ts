import { IdActiveType } from "./IdActiveType";
import { IUserInfo } from "../../types/IUser";
import { IActionActive, TypeActionActive } from "./actionActive";
import {IChannelInfo} from "../channels/IChannelInfo";

export interface IReducerActive {
    type: IdActiveType;
    selectedUser?: IUserInfo;
    selectedChannel?: IChannelInfo;
}

const initial: IReducerActive = {
    type: IdActiveType.Channel,
    selectedChannel: {
        key: "channel23",
        name: "Weird Company"
    }
}

export default (state: IReducerActive = initial, action: IActionActive): IReducerActive => {
    switch(action.type) {
        case TypeActionActive.ACTIVE_UPDATE_USER:
            return {
                ...state, selectedUser: action.userInfo!,
                type: action.activeType
            }
        case TypeActionActive.ACTIVE_UPDATE_CHANNEL:
            return {
                ...state,
                selectedChannel: action.channelInfo!,
                selectedUser: undefined,
                type: action.activeType
            }
        default:
            return state;
    }
}