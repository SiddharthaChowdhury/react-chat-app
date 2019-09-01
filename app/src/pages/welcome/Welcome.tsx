import React from 'react';
import { IState } from '../../setup/IState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import "./welcome.scss";

interface IWelcomeState {}
interface IWelcomeDispatch {}
interface IWelcomeProps extends IWelcomeState, IWelcomeDispatch {}

class WelcomeDOM extends React.Component<IWelcomeProps> {
    render () {
        return (
            <h3>Welcome whoever!</h3>
        )
    }
}

const mapState = (state: IState): IWelcomeState => ({})
const mapDispatch = (state: Dispatch): IWelcomeDispatch => ({})

export const Welcome = connect(mapState, mapDispatch)(WelcomeDOM);
