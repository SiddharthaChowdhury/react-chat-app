import React, { PureComponent} from 'react';
import './App.css';
import {Login} from "../login/Login";
import {Home} from "../home/Home";
import {IState} from "../../config/IState";
import {thunkActionOnlineUsers} from "../home/onlineUsers/thunkActionOnlineUsers";
import {Action, Dispatch} from "redux";
import {selectApp} from "../../selector/selectApp";
import {connect} from "react-redux";
import {IdResponsiveRenderOnlyIn, Responsive} from "responsive-react/dist/Responsive";
import {getDeviceTypeInfo, IDeviceTypeInfo} from "responsive-react";

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
        const deviceInfo: IDeviceTypeInfo = getDeviceTypeInfo();
        if(isLoggedIn) {
            return (<Home />)
        }
        return (
            <React.Fragment>
                <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>
                    <div><pre>{JSON.stringify(getDeviceTypeInfo())}</pre></div>
                </Responsive>
                <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>
                    <Login />
                </Responsive>
            </React.Fragment>
        );
    };
}

export const mapState = (state: IState): IAppState => ({
    isLoggedIn: selectApp(state)
});
export const mapDispatch = (dispatch: Dispatch): IAppDispatch => ({
    onUpdateOnlineUsers: () => dispatch(thunkActionOnlineUsers())
});

export default connect(mapState, mapDispatch)(AppDOM);
