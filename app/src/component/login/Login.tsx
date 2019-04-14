import React, {Fragment} from "react";
// @ts-ignore
import logo from "../../logo.svg";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {thunkActionRequestLogin} from "./thunkActionLogin";
import {IUserInfo} from "../../types/IUserInfo";

interface ILoginState {
    userName: string
}

interface ILoginDispatch {
    onLogin: (userInfo: IUserInfo) => Action<any>
}

interface ILoginProps extends ILoginDispatch {}

const initialLoginState: ILoginState = {
    userName: ''
};

class LoginDOM extends React.PureComponent<ILoginProps, ILoginState> {
    public state = initialLoginState;
    public render = () => {
        const {userName} = this.state;
        const {onLogin} = this.props;
        return (
            <div className="App">
                <header className="content">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <Fragment>
                            <div>
                                <input type="text" name="userName" value={userName} onChange={this.onChange} placeholder="Name"/>
                            </div>
                            <div>
                                <button onClick={() => onLogin({userName})}>Sign in</button>
                            </div>
                        </Fragment>
                    </div>
                </header>
            </div>
        )
    };

    private onChange = (e: any) => {
        this.setState({userName: e.target.value})
    }
}

export const mapDispatch = (dispatch: Dispatch): ILoginDispatch => ({
    onLogin: (userInfo: IUserInfo) => dispatch(thunkActionRequestLogin(userInfo))
});

export const Login = connect(undefined, mapDispatch)(LoginDOM);