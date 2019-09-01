import React from 'react';
import { IUserInfo } from "../../types/IUser";
import { Action, Dispatch } from "redux";
import { connect } from 'react-redux';
import { IState } from '../../setup/IState';
import './tempAuth.scss';
import { actionAuthSignInRequest } from './actionAuth';
import { actionModalCloseAll } from '../modal/actionModal';

interface ITempLoginState {
    userList: Array<IUserInfo>
}

interface ITempLoginDispatch {
    onUserSelect: (userInfo: IUserInfo) => Action<any>;
    onModalClose: () => Action<any>
}

interface ITempLoginProps extends ITempLoginState, ITempLoginDispatch {}

class TempLoginDOM extends React.Component<ITempLoginProps> {
    public render () {
        const userList = this.props.userList;
        return (
            <div className={"authContainer"}>
                {userList.map((userInfo: IUserInfo, index: number) => {
                    return (
                        <div key={index} className={"userChoose"} onClick={() => this.handleUserClick(userInfo)}>{userInfo.name} ({userInfo.email})</div>
                    )
                })}
            </div>
        );
    }

    private handleUserClick = (userInfo: IUserInfo) => {
        this.props.onUserSelect(userInfo)
        this.props.onModalClose()
    }
}

const mapState = (state: IState): ITempLoginState => ({
    userList: Object.values(state.users.allUsers)
})

const mapDispatch = (dispatch: Dispatch): ITempLoginDispatch => ({
    onUserSelect: (userInfo: IUserInfo) => dispatch(actionAuthSignInRequest(userInfo)),
    onModalClose: () => dispatch(actionModalCloseAll())
})

export const TempLogin = connect(mapState, mapDispatch)(TempLoginDOM)

