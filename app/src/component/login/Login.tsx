import React, {Fragment} from "react";
import logo from "../../logo.svg";

interface ILoginState {
    userName: string
}

interface ILoginProps {
    onLogin: any
}

const initialLoginState: ILoginState = {
    userName: ''
};

export class Login extends React.PureComponent<ILoginProps, ILoginState> {
    public state = initialLoginState;
    public render = () => {
        const {onLogin} = this.props;
        return (
            <div className="App">
                <header className="content">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <Fragment>
                            <div>
                                <input type="text" name="userName" value={this.state.userName} onChange={this.onChange} placeholder="Name"/>
                            </div>
                            <div>
                                <button onClick={() => onLogin(this.state.userName)}>Sign in</button>
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