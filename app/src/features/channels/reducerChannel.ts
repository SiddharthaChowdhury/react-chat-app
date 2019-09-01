import {IChannelInfo} from "./IChannelInfo";
import {IActionChannel, TypeActionChannel} from "./actionChannel";

export interface IAllChannels {
  [key: string]: IChannelInfo
}
export interface IReducerChannel {
  channels: IAllChannels
}

const initial: IReducerChannel = {
  channels: {}
};

export default (state: IReducerChannel = initial, action: IActionChannel) => {
  switch(action.type) {
    case TypeActionChannel.ChannelsResponse:
      return reducerAddChannels(state, action);
    case TypeActionChannel.ChannelPendingMsgUpdate:
      return reducerUpdatePending(state, action);
    case TypeActionChannel.ChannelPendingMsgReset:
      return reducerUpdatePending(state, action, true);
    default:
      return state;
  }
}

const reducerAddChannels = (state: IReducerChannel, {channelList}: IActionChannel): IReducerChannel => {
  const channelObj: IAllChannels = {};
  channelList!.forEach((channel: IChannelInfo) => channelObj[channel.key] = channel);

  return {
    ...state,
    channels: channelObj
  }
};

const  reducerUpdatePending = (state: IReducerChannel, {channelKey}: IActionChannel, reset: boolean = false): IReducerChannel => {
  if(!channelKey || !state.channels[channelKey]) return state;

  const channels = {...state.channels};
  if(reset) {
    channels[channelKey].pendingMessageCount = 0;
  } else {
    const pendingCount = channels[channelKey].pendingMessageCount || 0;
    channels[channelKey].pendingMessageCount = pendingCount + 1;
  }

  return {
    ...state,
    channels,
  }
};