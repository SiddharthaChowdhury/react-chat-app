import React from 'react';
import { IState } from '../../setup/IState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    getDeviceTypeInfo,
    isMobileDevice,
    isTabletDevice,
} from 'typed-responsive-react';
import "./chat.scss";
import { TopNav } from '../../features/navTop/TopNav';
import { ChatBox } from '../../features/chatBox/ChatBox';
import {Grid} from "@material-ui/core";
import {SideNav} from "../../features/navSide/SideNav";
import {ScrollSection} from "../../features/generic/scrollWrapper/ScrollSection";
import {BotNav} from "../../features/navBot/BotNav";

interface IChatState {}
interface IChatDispatch {}
interface IChatProps extends IChatState, IChatDispatch {}

class ChatDOM extends React.Component<IChatProps> {
    render () {
        const {height, deviceTypeVariant} = getDeviceTypeInfo();
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
                                <ChatBox/>
                            </div>
                        </ScrollSection>

                        <BotNav deviceVariant={deviceTypeVariant}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapState = (state: IState): IChatState => ({})
const mapDispatch = (state: Dispatch): IChatDispatch => ({})

export const Chat = connect(mapState, mapDispatch)(ChatDOM);
