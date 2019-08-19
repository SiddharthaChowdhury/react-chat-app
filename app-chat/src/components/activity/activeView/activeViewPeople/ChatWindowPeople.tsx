import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../../setup/IState";

interface IChatWindowPeopleState {
}

interface IChatWindowPeopleDispatch {
}

interface IChatWindowPeopleProps extends IChatWindowPeopleState, IChatWindowPeopleDispatch {
}

const ChatWindowPeopleDOM: React.FC<IChatWindowPeopleProps> = (props) => {
    return (
        <div>People chat coming soon</div>
    )
};

const mapState = (state: IState): IChatWindowPeopleState => ({});
const mapDispatch = (dispatch: Dispatch): IChatWindowPeopleState => ({});

export const ChatWindowPeople = connect(mapState, mapDispatch)(ChatWindowPeopleDOM);
