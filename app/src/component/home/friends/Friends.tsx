import * as React from "react";
import {IState} from "../../../config/IState";
import {Action, Dispatch} from "redux";
import {thunkActionFriends} from "./thunkActionFriends";
import {connect} from "react-redux";
import {IUserInfo} from "../../../types/Types";
import {selectFriends} from "../../../selector/selectFriends";
import {FriendSearch} from "./FriendSearch";

interface IFriendsState {
    friends: Array<IUserInfo>;
}
interface IFriendsDispatch {
    onRequestFriends: () => Action<any>;
}
interface IFriendsProps extends IFriendsState, IFriendsDispatch {}

class FriendsDOM extends React.PureComponent<IFriendsProps> {
    componentDidMount(): void {
        const {onRequestFriends} = this.props;
        onRequestFriends()
    }

    render(): React.ReactNode {
        const {friends} = this.props;

        return (
            <React.Fragment>
                <div>
                    {friends.map(({name, email, id}: IUserInfo, index: number) => {
                        return <div data-id={id} key={index}>{name} - <i>{email}</i></div>
                    })}
                </div>
                <FriendSearch/>
            </React.Fragment>
        );
    }
}

const mapState = (state: IState): IFriendsState => ({
    friends: selectFriends(state)
});
const mapDispatch = (dispatch: Dispatch): IFriendsDispatch => ({
    onRequestFriends: () => dispatch(thunkActionFriends())
});

export default connect(mapState, mapDispatch)(FriendsDOM)