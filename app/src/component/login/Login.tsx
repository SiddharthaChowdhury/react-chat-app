import React, {ChangeEvent, Fragment} from "react";
// @ts-ignore
import logo from "../../logo.svg";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {thunkActionRequestLogin} from "./thunkActionLogin";
import {IUserInfo} from "../../types/IUserInfo";
import {ErrorMessage} from "../errorMessage/ErrorMessage";

interface ILoginState {
    userName: string;
    password: string;
}

interface ILoginDispatch {
    onLogin: (userInfo: IUserInfo) => Action<any>
}

interface ILoginProps extends ILoginDispatch {}

const initialLoginState: ILoginState = {
    userName: '',
    password: ''
};

class LoginDOM extends React.PureComponent<ILoginProps, ILoginState> {
    public state: ILoginState = initialLoginState;
    public render = () => {
        const {userName, password} = this.state;
        const {onLogin} = this.props;
        // @ts-ignore
        return (
            <div className="App">
                <header className="content">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <ErrorMessage />
                        <Fragment>
                            <div>
                                <input type="text" name="userName" onChange={this.onChange} placeholder="Name"/>
                            </div>
                            <div>
                                <input type="password" name="password" onChange={this.onChange} placeholder="Password"/>
                            </div>
                            <div>
                                <button onClick={() => onLogin({userName, password})}>Sign in</button>
                            </div>
                        </Fragment>
                    </div>
                </header>
            </div>
        )
    };

    private onChange = (e: any) => {
        const {name, value} = e.target;
        this.setState({[name]: value} as Pick<ILoginState, keyof ILoginState>);
    }
}

export const mapDispatch = (dispatch: Dispatch): ILoginDispatch => ({
    onLogin: (userInfo: IUserInfo) => dispatch(thunkActionRequestLogin(userInfo))
});

export const Login = connect(undefined, mapDispatch)(LoginDOM);