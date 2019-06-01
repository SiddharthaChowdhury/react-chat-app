import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../../../config/IState";
import {selectOnline} from "../../../selector/selectOnline";
import "./styleOnlineUsers.scss"
import {Action, Dispatch} from "redux";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {actionActivitySelect} from "../activity/actionActivity";
import {IAuthUserInfo} from "../../../types/IUserInfo";
import {selectUserInfo} from "../../../selector/selectUserInfo";
import {Grid} from "@material-ui/core";

interface IOnlineUsersState {
    onlineUsers: Array<IAuthUserInfo>;
    userInfo: IAuthUserInfo;
}
interface IOnlineUsersDispatch {
    onClick: (selected: IdActivitySelectable, identity: IAuthUserInfo) => Action<any>
}

interface IOnlineUsersProps extends IOnlineUsersState, IOnlineUsersDispatch {}

class OnlineUsersDOM extends React.PureComponent<IOnlineUsersProps>{
    public render(): React.ReactNode {
        const {onlineUsers, onClick, userInfo:{email}} = this.props;
        let me: React.ReactNode | null = null;
        const myEmail = email;
        return (
            <Grid item className={'onlineUsersList'}>
                {
                    onlineUsers.map((user: IAuthUserInfo, _key: number) => {
                        const {id, email, name} = user;
                        if( myEmail === email) {
                            me = (
                                <Grid className='onlineUserTab' key={_key}>
                                    <span className="onlineDot"/>
                                    <b>{user.email}</b>
                                </Grid>
                            );

                            return null
                        }
                        return (
                            <Grid key={_key} className='onlineUserTab' onClick={() => onClick(IdActivitySelectable.user, user)}>
                                <span className="onlineDot"/>
                                <span>{user.email}</span>
                            </Grid>
                        )
                    })
                }
                {me}
            </Grid>
        )
    }
}

const mapState = (state: IState): IOnlineUsersState => ({
    onlineUsers: selectOnline(state),
    userInfo: selectUserInfo(state),
});

const mapDispatch = (dispatch: Dispatch): IOnlineUsersDispatch => ({
    onClick: (selected: IdActivitySelectable, identity: IAuthUserInfo) => dispatch(actionActivitySelect(selected, identity))
});

export default connect(mapState, mapDispatch)(OnlineUsersDOM)