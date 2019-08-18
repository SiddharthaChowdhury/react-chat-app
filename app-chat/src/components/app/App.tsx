import React from 'react';
import { Chat } from '../chat/Chat';
import {socket} from "../../utils/utilSocket";
import {Action, Dispatch} from "redux";
import {actionAppLoginRequest, actionUpdateDeviceInfo} from "./actionApp";
import {connect} from "react-redux";
import {IState} from "../../setup/IState";
import {IReducerApp} from "./reducerApp";
import {selectApp} from "../../selector/selectApp";
import {getDeviceTypeInfo, IDeviceInfo} from "typed-responsive-react";
import {Modal} from "../../generic/modal/Modal";

interface IAppState {
  appInfo: IReducerApp
}
interface IAppDispatch {
  onAuthRequest: () => Action<any>;
  onUpdateDeviceInfo: (deviceInfo: IDeviceInfo) => Action<any>;
}
interface IAppProps extends IAppState, IAppDispatch {}

class App extends React.Component<IAppProps> {

    componentDidMount(): void {
        const {onAuthRequest} = this.props;

        window.addEventListener('resize', this.handleResize, false);
        socket.initiate();
        onAuthRequest();
    }

    public render = () => {
        const {appInfo: {isLoggedIn}} = this.props;

        if(!isLoggedIn) {
        // TODO: replace it with a component which can redirect to login after certain time
        return <h3>Loading please wait ...</h3>
        }

        return (
            <>
                <Modal/>
                <Chat/>
            </>
        );
    };

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize, false);
    }

    private handleResize = (e: any) => {
        const deviceInfo: IDeviceInfo  = getDeviceTypeInfo();
        this.props.onUpdateDeviceInfo(deviceInfo);
    };
}

const mapState = (state: IState): IAppState => ({
    appInfo: selectApp(state)
});

const mapDispatch = (dispatch: Dispatch): IAppDispatch => ({
    onAuthRequest:  () => dispatch(actionAppLoginRequest()),
    onUpdateDeviceInfo: (deviceInfo: IDeviceInfo) => dispatch(actionUpdateDeviceInfo(deviceInfo))
});

export default connect(mapState, mapDispatch)(App);
