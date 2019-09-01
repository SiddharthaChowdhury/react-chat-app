import * as React from 'react'
import {IState} from '../../setup/IState';
import {Action, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IChannelInfo} from "./IChannelInfo";
import {IdActiveType} from "../activity/IdActiveType";
import {actionActiveChannelUpdate} from "../activity/actionActive";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {ScrollSection} from "../generic/scrollWrapper/ScrollSection";
import "./channels.scss";
import {IReducerActive} from "../activity/reducerActive";
import {actionChannelPendingReset} from "./actionChannel";

interface IChannelsState {
  active: IReducerActive;
  channels: Array<IChannelInfo>;
}

interface IChannelsDispatch {
  onSetActiveContext: (activeInfo: IChannelInfo) => Action<any>;
  onResetPendingMsg: (channelKey: string) => Action<any>;
}

interface IChannelsProps extends IChannelsState, IChannelsDispatch {
  handleChannelMore: any;
  peopleMoreOpen: boolean;
  channelMoreOpen: boolean;
  deviceVariant: string;
}

class ChannelsDOM extends React.Component<IChannelsProps> {
  public componentDidMount(): void {
  }

  public render(): React.ReactNode {
    const {channels, active} = this.props;
    const {type, selectedChannel} = active;
    const channelsObj = {
      important: channels,
      more: []
    };
    return (
        <>
          <div className={"sideNav-section-heading"}>
            <label >CHANNELS</label>
            <FontAwesomeIcon className={"section-icon"} icon={faPlus} />
          </div>
          <ScrollSection className={"sideNav-sections"}>
            <div className={"sideNav-section-important-channel"}>
              {channelsObj.important.map((channel: IChannelInfo, index: number) => {
                const {key, name, pendingMessageCount} = channel;
                const isSelectedClass = type === IdActiveType.Channel && selectedChannel && selectedChannel.key === key ? 'selected' : '';

                return (
                  <div className={`section-element ${isSelectedClass}`} key={index} onClick={() => this.onChangeActiveToChannel(channel)}>
                    <div className={"section-icon"}>#</div>
                    <div>{this.getLengthFilteredName(name)}</div>
                    {(pendingMessageCount && pendingMessageCount > 0) ?
                        <div className={"new-message-tag"}>{pendingMessageCount === 1 ? 'New': pendingMessageCount}</div>
                        : null
                    }
                  </div>
                )
                }
              )}
            </div>
            {this.props.channelMoreOpen && !this.props.peopleMoreOpen && channelsObj.more.map((channel: IChannelInfo, index: number) => {
              const {key, name, pendingMessageCount} = channel;
              const isSelectedClass = type === IdActiveType.Channel && selectedChannel && selectedChannel.key === key ? 'selected' : '';
              return (
                <div className={`section-element ${isSelectedClass}`} key={index} onClick={() => this.onChangeActiveToChannel(channel)}>
                  <div className={"section-icon"}>#</div>
                  <div>{this.getLengthFilteredName(name)}</div>
                  {(pendingMessageCount && pendingMessageCount > 0) ?
                      <div className={"new-message-tag"}>{pendingMessageCount === 1 ? 'New': pendingMessageCount}</div>
                      : null
                  }
                </div>
              )
              }
            )}
          </ScrollSection>
          {channelsObj.more.length > 0 && <small className={"more"} onClick={this.props.handleChannelMore}>{this.props.channelMoreOpen ? 'Less' : 'More'}</small>}
        </>
    )
  };

  private getLengthFilteredName = (name: string): string => {
    if (this.props.deviceVariant !== 'LaptopSmall') {
      return name;
    }

    return name.length > 18 ? name.substr(0, 18) + '...' : name;
  };

  private onChangeActiveToChannel = (channel: IChannelInfo) => {
    const {onSetActiveContext, onResetPendingMsg} = this.props;
    onSetActiveContext(channel);
    onResetPendingMsg(channel.key);
  };
}

const mapState = (state: IState): IChannelsState => ({
  active: state.active,
  channels: Object.values(state.channels.channels)
});
const mapDispatch = (dispatch: Dispatch): IChannelsDispatch => ({
  onSetActiveContext: (activeInfo: IChannelInfo) => dispatch(actionActiveChannelUpdate(activeInfo, IdActiveType.Channel)),
  onResetPendingMsg: (channelKey: string) => dispatch(actionChannelPendingReset(channelKey))
});

export default connect(mapState, mapDispatch)(ChannelsDOM);
