import * as React from 'react';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import "./topNav.scss";
import {Grid} from "@material-ui/core";
import {IReducerActiveView} from "../../activity/activeView/reducerActiveView";
import {selectActivityActiveView} from "../../../selector/selectActivity";

interface ITopNavState {
    activeViewInfo: IReducerActiveView
}

interface ITopNavDispatch {
}

interface ITopNavProps extends ITopNavState, ITopNavDispatch {
}

class TopNavDOM extends React.Component<ITopNavProps> {
    render () {
        const {name} = this.props.activeViewInfo;

        return (
            <Grid item className={"content-top"}>
                <div className="user-avatar"/>
                <div className={"user-name"}>
                    <div className={"user-name-f"}>{name[0]}</div>
                    <div className={"user-name-l"}>{name[1] || null}</div>
                </div>
            </Grid>
        )
    }
}

const mapState = (state: IState): ITopNavState => ({
    activeViewInfo: selectActivityActiveView(state)
});
// const mapDispatch = (dispatch: Dispatch): ITopNavState => ({});

export const TopNav = connect(mapState, null)(TopNavDOM);
