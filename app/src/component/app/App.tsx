import React, { PureComponent} from 'react';
import './App.css';
import {Login} from "../login/Login";
import {Home} from "../home/Home";
import {socket} from "../../util/utilSocket";
import {IdSocketVerb} from "../../types/Types";
import {IState} from "../../config/IState";
import {thunkActionOnlineUsers} from "../home/onlineUsers/thunkActionOnlineUsers";
import {Action, Dispatch} from "redux";
import {selectApp} from "./selectApp";
import {connect} from "react-redux";

interface IAppState {
    isLoggedIn: boolean;
}

interface IAppDispatch {
    onUpdateOnlineUsers: () => Action<any>
}

interface IAppProps extends IAppState, IAppDispatch {}

class AppDOM extends PureComponent<IAppProps> {
    componentDidMount(): void {
        const { onUpdateOnlineUsers } = this.props;
        onUpdateOnlineUsers();
    }

    public render = () => {
        const {isLoggedIn} = this.props;

        if(isLoggedIn) {
            return (<Home />)
        }
        return (<Login />);
    };
}

export const mapState = (state: IState): IAppState => ({
    isLoggedIn: selectApp(state)
});
export const mapDispatch = (dispatch: Dispatch): IAppDispatch => ({
    onUpdateOnlineUsers: () => dispatch(thunkActionOnlineUsers())
});

export default connect(mapState, mapDispatch)(AppDOM);
