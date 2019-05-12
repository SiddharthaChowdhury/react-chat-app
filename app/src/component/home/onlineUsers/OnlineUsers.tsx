import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../../../config/IState";
import {selectOnline} from "../../../selector/selectOnline";
import "./styleOnlineUsers.css"
import {Action, Dispatch} from "redux";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {actionActivitySelect} from "../activity/actionActivity";
import {IAuthUserInfo} from "../../../types/IUserInfo";
import {selectUserInfo} from "../../../selector/selectUserInfo";

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

        return (
            <div>
                {
                    onlineUsers.map((user: string, _key: number) => {
                        if(user === userName) {
                            return <div className='onlineUserTab' key={_key}>-> <b>{user}</b></div>
                        }
                        return <div key={_key} className='onlineUserTab' onClick={() => onClick(IdActivitySelectable.user, user)}>{user}</div>
                    })
                }
            </div>
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