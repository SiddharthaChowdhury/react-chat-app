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
    onlineUsers: Array<string>;
    userInfo: IAuthUserInfo;
}
interface IOnlineUsersDispatch {
    onClick: (selected: IdActivitySelectable, identity: string) => Action<any>
}

interface IOnlineUsersProps extends IOnlineUsersState, IOnlineUsersDispatch {}

class OnlineUsersDOM extends React.PureComponent<IOnlineUsersProps>{
    public render(): React.ReactNode {
        const {onlineUsers, onClick, userInfo:{userName}} = this.props;
        let me: React.ReactNode | null = null;

        return (
            <Grid item className={'onlineUsersList'}>
                {
                    onlineUsers.map((user: string, _key: number) => {
                        if(user === userName) {
                            me = (
                                <Grid className='onlineUserTab' key={_key}>
                                    <span className="onlineDot"/>
                                    <b>{user}</b>
                                </Grid>
                            );

                            return null
                        }
                        return (
                            <Grid key={_key} className='onlineUserTab' onClick={() => onClick(IdActivitySelectable.user, user)}>
                                <span className="onlineDot"/>
                                <span>{user}</span>
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
    onClick: (selected: IdActivitySelectable, identity: string) => dispatch(actionActivitySelect(selected, identity))
});

export default connect(mapState, mapDispatch)(OnlineUsersDOM)