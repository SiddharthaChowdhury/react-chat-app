import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {getWindowDimension, getDeviceTypeInfo, isMobileDevice, isTabletDevice} from 'typed-responsive-react';
import './chat.scss';
import {Grid} from "@material-ui/core";
import {Camera, Send, TagFaces} from "@material-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import { IState } from '../../setup/IState';
import { ScrollSection } from '../../generic/scrollBar/ScrollSection';
import { SideNav } from './sideNav.tsx/SideNav';

interface IChatState {
}

interface IChatDispatch {
}

interface IChatProps extends IChatState, IChatDispatch {
}

class ChatDOM extends React.Component<IChatProps> {
    public readonly state = {...getWindowDimension(), deviceVariant: getDeviceTypeInfo().deviceTypeVariant};
    render () {
        const {height} = this.state;
        const deviceVariant = this.state.deviceVariant;
        const mainBoxWidth: React.CSSProperties = { width: deviceVariant === 'LaptopSmall' || isMobileDevice() ? '100%' : '80%'};
        const textArea: React.CSSProperties = { width: deviceVariant === 'LaptopSmall' || isMobileDevice() ? '70%' : '77%'};

        return (
            <Grid container className={"container"} style={{height}}>
                <Grid item style={mainBoxWidth} className={ isMobileDevice() || isTabletDevice() ? "main-box-mobile main-box" : "main-box-laptop main-box"}>
                    <SideNav deviceVariant={this.state.deviceVariant}/>
                    {/*  */}
                    <Grid item  className={"content-wrapper"} >
                        <Grid item className={"content-top"}>
                            <div className="user-avatar"/>
                            <div className={"user-name"}>
                                <div className={"user-name-f"}>Siddhartha</div>
                                <div className={"user-name-l"}>Chowdhury</div>
                            </div>
                        </Grid>
                        <ScrollSection className={"main-content"}>
                            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
                        </ScrollSection>
                        <Grid item className={"content-bot"}>
                            <div className="content-wrapper">
                                <div className="options-left">
                                    <div className="option-btn"><FontAwesomeIcon className={"section-icon"} icon={faEllipsisH} /></div>
                                    <div className="option-btn"><TagFaces/></div>
                                </div>
                                <div className="options-right">
                                    <div className="option-btn"><Camera/></div>
                                    <div className="option-btn"><Send/></div>
                                </div>
                                <textarea className="textarea" style={textArea} placeholder="Start cursing..."/>
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
        const dimension = getWindowDimension();
        this.setState({...dimension});
    };
};

const mapState = (state: IState): IChatState => ({});
const mapDispatch = (dispatch: Dispatch): IChatState => ({});

export const Chat = connect(mapState, mapDispatch)(ChatDOM);
