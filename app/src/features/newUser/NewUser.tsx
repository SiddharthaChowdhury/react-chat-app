import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../setup/IState";
import {PopOver} from "../generic/popOver/PopOver";

interface INewUserState {
}

interface INewUserDispatch {
}

interface INewUserProps extends INewUserState, INewUserDispatch {
    openState: boolean;
    onClose: () => any;
}

class NewUserDOM extends React.Component<INewUserProps> {
    render () {
        return (
            <PopOver isOpen={this.props.openState}>
                <h3>New User form</h3>
                <button onClick={this.props.onClose}>Close</button>
            </PopOver>
        )
    }
}

const mapState = (state: IState): INewUserState => ({});
const mapDispatch = (dispatch: Dispatch): INewUserDispatch => ({});

export const NewUser = connect(mapState, mapDispatch)(NewUserDOM);
