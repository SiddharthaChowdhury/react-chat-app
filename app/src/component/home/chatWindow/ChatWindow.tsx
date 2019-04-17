import {IReducerActivity} from "../activity/reducerActivity";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {IState} from "../../../config/IState";
import {selectActivity} from "../activity/selectActivity";
import {connect} from "react-redux";
import * as React from "react";

interface IChatWindowState {
    activity: IReducerActivity
}

interface IChatWindowDispatch {}

interface IChatWindowProps extends IChatWindowState, IChatWindowDispatch {}

const ChatWindowDOM: React.FC<IChatWindowProps> = (props) => {
    const {activity:{selected, identity}} = props;

    if (!selected) {
        return null;
    }

    if (selected === IdActivitySelectable.user) {
        return (<div>Chat window coming soon, user: {identity}</div>)
    }

    return (
        <div>Room coming soon</div>
    )
};

const mapState = (state: IState): IChatWindowState => ({
    activity: selectActivity(state)
});

export const ChatWindow = connect(mapState, undefined)(ChatWindowDOM)
