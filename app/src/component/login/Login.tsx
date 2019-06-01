import React, {Fragment} from "react";
// @ts-ignore
import logo from "../../logo.svg";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {thunkActionRequestLogin} from "./thunkActionLogin";
import {IAuthUserInfo} from "../../types/IUserInfo";
import {ErrorMessage} from "../errorMessage/ErrorMessage";
import {IdActiveAuthPage} from "./IdActiveAuthPage";
import "./login.css";
import {TextField} from "@material-ui/core";
import {utilPersistence} from "../../util/utilPersistence/utilPersistence";
import {IdPersistence} from "../../util/utilPersistence/IdPersistence";

interface ILoginState {
    name: string
    email: string;
    password: string;
    activeAuthView: IdActiveAuthPage;
}

interface ILoginDispatch {
    onLogin: (userInfo: IAuthUserInfo) => Action<any>
}

interface ILoginProps extends ILoginDispatch {}

const initialLoginState: ILoginState = {
    name: '',
    email: '',
    password: '',
    activeAuthView: IdActiveAuthPage.Login
};

class LoginDOM extends React.PureComponent<ILoginProps, ILoginState> {
    public state: ILoginState = initialLoginState;

    componentDidMount(): void {
        const tokenInfo: any = utilPersistence.getValue(IdPersistence.auth);
        if (tokenInfo.token && tokenInfo.token.email) {

        }
    }

    public render = () => {
        const loginForm = this.logInForm();

        return (
            <React.Fragment>
            {loginForm}
            </React.Fragment>
        );
        // return (<h2>Please wait...</h2>)
    };

    private logInForm = () => {
        const {email, password, name} = this.state;
        const {onLogin} = this.props;

        return (
            <div className="App">
                <header className="content">
                    <h1>{this.state.activeAuthView}</h1>
                    <small><img src={logo} className="App-logo" alt="logo" /></small>
                    <div>
                        <ErrorMessage />
                        <Fragment>
                            <div>
                                <span className={'cursor-pointer'} data-id={IdActiveAuthPage.Login} onClick={this.onPageChange}>Login</span>
                                &nbsp; | &nbsp;
                                <span className={'cursor-pointer'} data-id={IdActiveAuthPage.Register} onClick={this.onPageChange}>Register</span>
                            </div>
                            {this.state.activeAuthView === IdActiveAuthPage.Register &&
                            <div >
                                <TextField
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    name="name"
                                    onChange={this.onChange}
                                    type={"text"}
                                    autoComplete={"off"}
                                />
                            </div>
                            }
                            <div>
                                <TextField
                                    required
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    onChange={this.onChange}
                                    type={"email"}
                                    autoComplete={"off"}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    name="password"
                                    onChange={this.onChange}
                                    type={"password"}
                                    autoComplete={"off"}
                                />
                            </div>
                            <div>
                                <button onClick={() => onLogin({email, password, name})}>Sign in</button>
                            </div>
                        </Fragment>
                    </div>
                </header>
            </div>
        )
    };

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        this.setState({[name]: value} as Pick<ILoginState, keyof ILoginState>);
    };

    private onPageChange = (e: React.MouseEvent<HTMLInputElement> | any) => {
        if (e.target.getAttribute('data-id') === IdActiveAuthPage.Register) {
            this.setState({activeAuthView: IdActiveAuthPage.Register});

            return
        }

        this.setState({activeAuthView: IdActiveAuthPage.Login})
    };
}

export const mapDispatch = (dispatch: Dispatch): ILoginDispatch => ({
    onLogin: (userInfo: IAuthUserInfo) => dispatch(thunkActionRequestLogin(userInfo))
});

export const Login = connect(undefined, mapDispatch)(LoginDOM);