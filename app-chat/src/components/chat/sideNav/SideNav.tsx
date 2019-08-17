import React from "react";
import { Grid } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import "./sideNav.scss";
import { Channels } from "./channels/Channels";
import { People } from "./people/People";
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import {selectApp} from "../../../selector/selectApp";

interface ISideNavState {
    deviceVariant: string
}
interface ISideNavDispatch {}
interface ISideNavProps extends ISideNavState, ISideNavDispatch {
}

class SideNavDOM extends React.Component<ISideNavProps> {
    state = {peopleMoreOpen: false, channelMoreOpen: false};

    render() {
        const companyName = "Dummy Company Private Limited ";
        const shortCompanyName = companyName.length > 28 ? companyName.substr(0, 27) + '...' : companyName;

        return (
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
                    <Channels
                        handleChannelMore={this.handleChannelMore} 
                        channelMoreOpen={this.state.channelMoreOpen}
                        peopleMoreOpen={this.state.peopleMoreOpen}
                        deviceVariant={this.props.deviceVariant}
                    />
                </div>

                {/* --- PEOPLE SECTION ----*/}
                <div className={"sideNav-section"}>
                    <People 
                        handlePeopleMore={this.handlePeopleMore} 
                        channelMoreOpen={this.state.channelMoreOpen}
                        peopleMoreOpen={this.state.peopleMoreOpen}
                        deviceVariant={this.props.deviceVariant}
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
    deviceVariant: selectApp(state).deviceInfo.deviceTypeVariant
});

export const SideNav = connect(mapState, null)(SideNavDOM);