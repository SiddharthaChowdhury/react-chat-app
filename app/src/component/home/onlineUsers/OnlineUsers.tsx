import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../../../config/IState";
import {selectOnline} from "./selectOnline";

interface IOnlineUsersState {
    onlineUsers: Array<string>
}
interface IOnlineUsersDispatch {}

interface IOnlineUsersProps extends IOnlineUsersState, IOnlineUsersDispatch {}

class OnlineUsersDOM extends React.PureComponent<IOnlineUsersProps>{
    public render(): React.ReactNode {
        const {onlineUsers} = this.props;

        return (
            <div>
                {
                    onlineUsers.map((user: any, _key: number) => {
                        return <div key={_key}>{user}</div>
                    })
                }
            </div>
        )
    }
}

const mapState = (state: IState): IOnlineUsersState => ({
    onlineUsers: selectOnline(state)
});

export default connect(mapState, undefined)(OnlineUsersDOM)