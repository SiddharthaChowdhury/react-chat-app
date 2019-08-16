import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../../../setup/IState";
import { Dispatch } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { ScrollSection } from "../../../../generic/scrollBar/ScrollSection";


interface IChannelState {}
interface IChannelDispatch {}
interface IChannelProps extends IChannelState, IChannelDispatch {
    handleChannelMore: any;
    peopleMoreOpen: boolean;
    channelMoreOpen: boolean;
    deviceVariant: string
}

class ChannelsDOM extends React.Component<IChannelProps> {
    render() {
        const channels = {
            important: ["Team Dummy", "BackEnd", "FrontEnd", "Sales", "Bug report"],
            more: ["Happy birthday", "Personal", "Lunch", "Games", "Holidays"]
        };
        return (
            <>
                <div className={"sideNav-section-heading"}>
                    <label >CHANNELS</label>
                    <FontAwesomeIcon className={"section-icon"} icon={faPlus} />
                </div>
                <ScrollSection className={"sideNav-sections"}>
                    <div className={"sideNav-section-important"}>
                        {channels.important.map((channel: any, index: number) =>
                            <div className={"section-element"} key={index}>
                                <FontAwesomeIcon className={"section-icon"} icon={faHashtag} />
                                <div>{this.getLengthFilteredName(channel)}</div>
                            </div>
                        )}
                    </div>
                    {this.props.channelMoreOpen && !this.props.peopleMoreOpen && channels.more.map((channel: any, index: number) =>
                        <div className={"section-element"} key={index}>
                            <FontAwesomeIcon className={"section-icon"} icon={faHashtag} />
                            <div>{this.getLengthFilteredName(channel)}</div>
                        </div>
                    )}
                </ScrollSection>
                {channels.more && <small className={"more"} onClick={this.props.handleChannelMore}>{this.props.channelMoreOpen ? 'Less' : 'More'}</small>}
            </>
        )
    }

    private getLengthFilteredName = (name: string): string => {
        if (this.props.deviceVariant !== 'LaptopSmall') {
            return name;
        }

        return name.length > 18 ? name.substr(0, 18) + '...' : name;
    }
}

const mapState = (state: IState): IChannelState => ({})
const mapDispatch = (dispatch: Dispatch): IChannelState => ({})

export const Channels = connect(mapState, mapDispatch)(ChannelsDOM);