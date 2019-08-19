import * as React from 'react';
import {connect} from "react-redux";
import {
    isMobileDevice,
    isTabletDevice,
    IDeviceInfo
} from 'typed-responsive-react';
import './chat.scss';
import {Grid} from "@material-ui/core";
import { IState } from '../../setup/IState';
import { ScrollSection } from '../../generic/scrollBar/ScrollSection';
import { SideNav } from './sideNav/SideNav';
import {selectApp} from "../../selector/selectApp";
import {BotNav} from "./botNav/BotNav";
import {TopNav} from "./topNav/TopNav";
import {ActiveView} from "../activity/activeView/ActiveView";

interface IChatState {
    deviceInfo: IDeviceInfo;
}

interface IChatDispatch {
}
interface IChatProps extends IChatState, IChatDispatch {
}

class ChatDOM extends React.Component<IChatProps> {

    render () {
        const {height, deviceTypeVariant} = this.props.deviceInfo;
        const mainBoxWidth: React.CSSProperties = { width: deviceTypeVariant === 'LaptopSmall' || isMobileDevice() ? '100%' : '80%'};

        return (
            <Grid container className={"container"} style={{height}}>
                <Grid item style={mainBoxWidth} className={ isMobileDevice() || isTabletDevice() ? "main-box-mobile main-box" : "main-box-laptop main-box"}>
                    <SideNav />
                    <Grid item  className={"content-wrapper"} >
                        <TopNav/>

                        {/*TODO: Later separate it out during chat implementation*/}
                        <ScrollSection className={"main-content"}>
                            <div className={"main-content-child"}>
                                <ActiveView/>
                            </div>
                        </ScrollSection>

                        <BotNav deviceVariant={deviceTypeVariant}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapState = (state: IState): IChatState => {
    return {
        deviceInfo: selectApp(state).deviceInfo
    }
};
// const mapDispatch = (dispatch: Dispatch): IChatState => ({});

export const Chat = connect(mapState, null)(ChatDOM);
