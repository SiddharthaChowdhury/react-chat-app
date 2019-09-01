import React from 'react';
import { IState } from '../../setup/IState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import "./sideNav.scss";
import {
    getDeviceTypeInfo,
} from 'typed-responsive-react';
import {IUserInfo} from "../../types/IUser";
import { Grid } from "@material-ui/core";
import Channels from "../channels/Channels";
import {UserList} from "../userList/UserList";

interface ISideNavState {
    userInfo: IUserInfo
}
interface ISideNavDispatch {}
interface ISideNavProps extends ISideNavState, ISideNavDispatch {}

class SideNavDOM extends React.Component<ISideNavProps> {
    state = {peopleMoreOpen: false, channelMoreOpen: false};

    render = () => {
        const {deviceTypeVariant} = getDeviceTypeInfo();
        const {userInfo: {companyName}, } = this.props;
        const shortCompanyName = companyName!.length > 28 ? companyName!.substr(0, 27) + '...' : companyName!;
        return (
            <Grid item className={"sideNav"}>
                <div className={"sideNav-header"}>
                    <div className={"company-name"}>
                        {shortCompanyName}
                    </div>
                </div>
                <div className={"sideNav-search"}>
                    <input type={"text"} className={"search-box"} placeholder={"Search"}/>
                </div>

                {/* --- CHANNEL SECTION ----*/}
                <div className={"sideNav-section"}>
                    <Channels
                        handleChannelMore={this.handleChannelMore}
                        channelMoreOpen={this.state.channelMoreOpen}
                        peopleMoreOpen={this.state.peopleMoreOpen}
                        deviceVariant={deviceTypeVariant}
                    />
                </div>

                {/* --- PEOPLE SECTION ----*/}
                <div className={"sideNav-section"}>
                    <UserList
                        handlePeopleMore={this.handlePeopleMore}
                        channelMoreOpen={this.state.channelMoreOpen}
                        peopleMoreOpen={this.state.peopleMoreOpen}
                        deviceVariant={deviceTypeVariant}
                    />
                </div>
            </Grid>
        )
    }

    private handlePeopleMore = (e: any) => {
        const newState: any = {peopleMoreOpen: !this.state.peopleMoreOpen};
        if (this.state.channelMoreOpen) {
            newState['channelMoreOpen'] = !this.state.channelMoreOpen;
        }
        this.setState({...newState});
    };

    private handleChannelMore = (e: any) => {
        const newState: any = {channelMoreOpen: !this.state.channelMoreOpen};
        if (this.state.peopleMoreOpen) {
            newState['peopleMoreOpen'] = !this.state.peopleMoreOpen;
        }
        this.setState({...newState});
    };
}

const mapState = (state: IState): ISideNavState => ({
    userInfo: state.auth.userInfo!
});
const mapDispatch = (state: Dispatch): ISideNavDispatch => ({})

export const SideNav = connect(mapState, mapDispatch)(SideNavDOM);
