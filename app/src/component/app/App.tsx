import React, {PureComponent} from 'react';
import './App.css';
import {Login} from "../login/Login";
import {Home} from "../hme/Home";
import {IState} from "../../config/IState";
import {thunkActionOnlineUsers} from "../home/onlineUsers/thunkActionOnlineUsers";
import {Action, Dispatch} from "redux";
import {selectApp} from "../../selector/selectApp";
import {connect} from "react-redux";
import {IDeviceTypeInfo} from "responsive-react/dist/types";
import {getDeviceTypeInfo} from "responsive-react/dist/utilResponsive";
import {IdResponsiveRenderOnlyIn, Responsive} from "responsive-react";

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
        console.log(deviceInfo);

        if(isLoggedIn) {
            return (<Home />)
        }
        return (
            <React.Fragment>
                <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>
                    <h3>Mobile app not ready!</h3>
                    {/*<Login />*/}
                </Responsive>
                <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>
                    <Home />
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
