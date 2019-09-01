import {Action} from "redux";
import {IChannelInfo} from "./IChannelInfo";

export enum TypeActionChannel {
  ChannelsRequest = "Channels > Request",
  ChannelsResponse = "Channels > Response",
  ChannelPendingMsgUpdate = "Channels > Pending_msg > Update",
  ChannelPendingMsgReset = "Channels > Pending_msg > Reset"
}

export interface IActionChannel extends Action{
  channelList?: Array<IChannelInfo>;
  channelKey?: string;
  type: TypeActionChannel;
}

export const actionAddChannels = (channelList: Array<IChannelInfo>): IActionChannel => ({
  channelList,
  type: TypeActionChannel.ChannelsResponse
});

export const actionChannelPendingUpdate = (channelKey: string): IActionChannel => ({
  channelKey,
  type: TypeActionChannel.ChannelPendingMsgUpdate
});

export const actionChannelPendingReset = (channelKey: string): IActionChannel => ({
  channelKey,
  type: TypeActionChannel.ChannelPendingMsgReset
});

