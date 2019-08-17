import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import "./topNav.scss";
import {Grid} from "@material-ui/core";
import {IUserInfoAuth} from "../../../customTypes/IUserInfo";
import {selectApp} from "../../../selector/selectApp";

interface ITopNavState {
    userInfo: IUserInfoAuth
}

interface ITopNavDispatch {
}

interface ITopNavProps extends ITopNavState, ITopNavDispatch {
}

class TopNavDOM extends React.Component<ITopNavProps> {
    render () {
        const {firstName, lastName} = this.props.userInfo;

        return (
            <Grid item className={"content-top"}>
                <div className="user-avatar"/>
                <div className={"user-name"}>
                    <div className={"user-name-f"}>{firstName}</div>
                    <div className={"user-name-l"}>{lastName}</div>
                </div>
            </Grid>
        )
    }
}

const mapState = (state: IState): ITopNavState => ({
    userInfo: selectApp(state).userInfo!
});
// const mapDispatch = (dispatch: Dispatch): ITopNavState => ({});

export const TopNav = connect(mapState, null)(TopNavDOM);
