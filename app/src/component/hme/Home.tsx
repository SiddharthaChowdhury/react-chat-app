import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../config/IState";
import './home.scss';
import {Grid} from "@material-ui/core";
import {IWindowDimensionMetrics} from "responsive-react/dist/types";
import {getWindowDimension, isMobileDevice, isTabletDevice} from "responsive-react/dist/utilResponsive";
import {Attachment, MoreVert, Send, TagFaces} from "@material-ui/icons";
import {ScrollSection} from "../generic/scrollBar/ScrollSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faHashtag, faPlus} from "@fortawesome/free-solid-svg-icons";

interface IHomeState {
}

interface IHomeDispatch {
}

interface IHomeProps extends IHomeState, IHomeDispatch {
}

class HomeDOM extends React.Component<IHomeProps> {
    public readonly state = {...getWindowDimension(), channelMoreOpen: false, peopleMoreOpen: false};
    render () {
        const {height} = this.state;
        const companyName = "Dummy Company Private Limited ";
        const shortCompanyName = companyName.length > 28 ? companyName.substr(0, 27) + '...' : companyName;

        const channels = {
            important: ["Team Dummy", "BackEnd", "FrontEnd", "Sales", "Bug report"],
            more: ["Happy birthday", "Personal", "Lunch", "Games", "Holidays"]
        };

        const people = {
            important: ["Mr None (you)","Super Man", "Tony Stark", "Captain Marvel", "Hawk Eye"],
            more: ["Stan Lee", "Robin", "Dr Ben", "Super Man", "Tony Stark", "Captain Marvel"]
        };

        return (
            <Grid container className={"container"} style={{height}}>
                <Grid item className={ isMobileDevice() || isTabletDevice() ? "main-box-mobile main-box" : "main-box-laptop main-box"}>
                    <Grid item className={"sideNav"}>
                        <div className={"sideNav-header"}>
                            <div className={"logo"}>
                                <div className={"companyName"}>
                                    <h4>{shortCompanyName}</h4>
                                </div>
                            </div>
                            <div className={"sideNav-header-moreBtn"}>
                                <MoreVert/>
                            </div>
                        </div>
                        <div className={"sideNav-search"}>
                            <input type={"text"} className={"search-box"} placeholder={"Search"}/>
                        </div>

                        {/* --- CHANNEL SECTION ----*/}
                        <div className={"sideNav-section"}>
                            <div className={"sideNav-section-heading"}>
                                <label >CHANNELS</label>
                                <FontAwesomeIcon className={"section-icon"} icon={faPlus} />
                            </div>
                            <ScrollSection className={"sideNav-sections"}>
                                <div className={"sideNav-section-important"}>
                                    {channels.important.map((section: any, index: number) =>
                                        <div className={"section-element"} key={index}>
                                            <FontAwesomeIcon className={"section-icon"} icon={faHashtag} />
                                            <div>{section}</div>
                                        </div>
                                    )}
                                </div>
                                {this.state.channelMoreOpen && !this.state.peopleMoreOpen && channels.more.map((channel: any, index: number) =>
                                    <div className={"section-element"} key={index}>
                                        <FontAwesomeIcon className={"section-icon"} icon={faHashtag} />
                                        <div>{channel}</div>
                                    </div>
                                )}
                            </ScrollSection>
                            <small className={"more"} onClick={this.handleChannelMore}>{this.state.channelMoreOpen ? 'Less' : 'More'}</small>
                        </div>

                        {/* --- PEOPLE SECTION ----*/}
                        <div className={"sideNav-section"}>
                            <div className={"sideNav-section-heading"}>
                                <label>PEOPLE</label>
                                <FontAwesomeIcon className={"section-icon"} icon={faPlus} />
                            </div>
                            <ScrollSection className={"sideNav-sections"}>
                                <div className={"sideNav-section-important"}>
                                    {people.important.map((section: any, index: number) =>
                                        <div className={"section-element"} key={index}>
                                            <FontAwesomeIcon className={"section-icon icon-online"} icon={faCircle} />
                                            <div>{section}</div>
                                        </div>
                                    )}
                                </div>
                                {this.state.peopleMoreOpen && !this.state.channelMoreOpen && people.more.map((person: any, index: number) =>
                                    <div className={"section-element"} key={index}>
                                        <FontAwesomeIcon className={"section-icon icon-offline"} icon={faCircle} />
                                        <div>{person}</div>
                                    </div>
                                )}
                            </ScrollSection>
                            <small className={"more"} onClick={this.handlePeopleMore}>{this.state.peopleMoreOpen ? 'Less' : 'More'}</small>
                        </div>

                    </Grid>
                    <Grid item  className={"content-wrapper"} >
                        <Grid item className={"content-top"}>
                            <div className="user-avatar"/>
                            <h4>Siddhartha</h4>
                        </Grid>
                        <ScrollSection className={"main-content"}>
                            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
                        </ScrollSection>
                        <Grid item className={"content-bot"}>
                            <div className="content-wrapper">
                                <div className="options-left">
                                    <div className="option-btn"><Attachment/></div>
                                    <div className="option-btn"><TagFaces/></div>
                                </div>
                                <div className="options-right">
                                    <div className="option-btn"><Send/></div>
                                </div>
                                <textarea className="textarea" placeholder="Start cursing..."/>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleResize, false);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize, false);
    }

    private handleResize = (e: any) => {
        const dimension: IWindowDimensionMetrics = getWindowDimension();
        this.setState({...dimension})
    }

    private handleChannelMore = (e: any) => {
        // this.setState({channelMoreOpen: !this.state.channelMoreOpen})
        const newState: any = {channelMoreOpen: !this.state.channelMoreOpen};
        if (this.state.peopleMoreOpen) {
            newState['peopleMoreOpen'] = !this.state.peopleMoreOpen;
        }
        this.setState({...newState});
    };
    private handlePeopleMore = (e: any) => {
        const newState: any = {peopleMoreOpen: !this.state.peopleMoreOpen};
        if (this.state.channelMoreOpen) {
            newState['channelMoreOpen'] = !this.state.channelMoreOpen;
        }
        this.setState({...newState});
    };
};

const mapState = (state: IState): IHomeState => ({});
const mapDispatch = (dispatch: Dispatch): IHomeState => ({});

export const Home = connect(mapState, mapDispatch)(HomeDOM);
