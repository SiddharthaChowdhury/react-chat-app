import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import {IReducerActiveView} from "./reducerActiveView";
import {selectActivityActiveView} from "../../../selector/selectActivity";
import {IdActiveViewType} from "./IActiveViewInfo";
import {ChatWindowPeople} from "./activeViewPeople/ChatWindowPeople";
import {Welcome} from "./activeViewDefault/Welcome";

interface IActiveViewState {
    activeView: IReducerActiveView
}

interface IActiveViewDispatch {
}

interface IActiveViewProps extends IActiveViewState, IActiveViewDispatch {
}

const _ActiveView: React.FC<IActiveViewProps> = (props) => {
    const {activeView: {type}} = props;
    switch (type) {
        case IdActiveViewType.People:
            return <ChatWindowPeople/>;
        default:
            return <Welcome/>
    }
};

const mapState = (state: IState): IActiveViewState => ({
    activeView: selectActivityActiveView(state)
});
const mapDispatch = (dispatch: Dispatch): IActiveViewDispatch => ({});

export const ActiveView = connect(mapState, mapDispatch)(_ActiveView);
