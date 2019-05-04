import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../../../config/IState";
import {selectOnline} from "../../../selector/selectOnline";
import "./styleOnlineUsers.css"
import {Action, Dispatch} from "redux";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {actionSelectActivity} from "../activity/actionActivity";

interface IOnlineUsersState {
    onlineUsers: Array<string>
}
interface IOnlineUsersDispatch {
    onClick: (selected: IdActivitySelectable, identity: string) => Action<any>
}

interface IOnlineUsersProps extends IOnlineUsersState, IOnlineUsersDispatch {}

class OnlineUsersDOM extends React.PureComponent<IOnlineUsersProps>{
    public render(): React.ReactNode {
        const {onlineUsers, onClick} = this.props;

        return (
            <div>
                {
                    onlineUsers.map((user: any, _key: number) => {
                        return <div key={_key} className='onlineUserTab' onClick={() => onClick(IdActivitySelectable.user, user)}>{user}</div>
                    })
                }
            </div>
        )
    }
}

const mapState = (state: IState): IOnlineUsersState => ({
    onlineUsers: selectOnline(state)
});

const mapDispatch = (dispatch: Dispatch): IOnlineUsersDispatch => ({
    onClick: (selected: IdActivitySelectable, identity: string) => dispatch(actionSelectActivity(selected, identity))
});

export default connect(mapState, mapDispatch)(OnlineUsersDOM)