import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../../../setup/IState";

interface INewPeopleState {
}

interface INewPeopleDispatch {
}

interface INewPeopleProps extends INewPeopleState, INewPeopleDispatch {
}

const _NewPeople: React.FC<INewPeopleProps> = (props) => {
    return (
        <div>
            Form to create new User
        </div>
    )
};

const mapState = (state: IState): INewPeopleState => ({});
const mapDispatch = (dispatch: Dispatch): INewPeopleState => ({});

export const NewPeople = connect(mapState, mapDispatch)(_NewPeople);
