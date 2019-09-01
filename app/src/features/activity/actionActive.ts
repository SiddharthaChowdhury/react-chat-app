import { Action } from "redux";
import { IUserInfo } from "../../types/IUser";
import { IdActiveType } from "./IdActiveType";
import {IChannelInfo} from "../channels/IChannelInfo";

export enum TypeActionActive {
    ACTIVE_UPDATE_USER = "Active > Update > User",
    ACTIVE_UPDATE_CHANNEL = "Active > Update > Channel"
}

export interface IActionActive extends Action {
    userInfo?: IUserInfo;
    channelInfo?: IChannelInfo
    activeType: IdActiveType;
    type: TypeActionActive
}

export const actionActiveUserUpdate = (userInfo: IUserInfo, activeType: IdActiveType = IdActiveType.Individual): IActionActive => ({
    userInfo,
    activeType,
    type: TypeActionActive.ACTIVE_UPDATE_USER
})

export const actionActiveChannelUpdate = (channelInfo: IChannelInfo, activeType: IdActiveType = IdActiveType.Channel): IActionActive => ({
    channelInfo,
    activeType,
    type: TypeActionActive.ACTIVE_UPDATE_CHANNEL
})