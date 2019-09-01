import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {Popover} from "@material-ui/core";
import {IState} from "../../../setup/IState";

interface IPopOverState {
}

interface IPopOverDispatch {
}

interface IPopOverProps extends IPopOverState, IPopOverDispatch {
    isOpen: boolean
}

const _PopOver: React.FC<IPopOverProps> = (props) => {
    return (
        <Popover
            open={props.isOpen}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {props.children}
        </Popover>
    )
};

const mapState = (state: IState): IPopOverState => ({});
const mapDispatch = (dispatch: Dispatch): IPopOverDispatch => ({});

export const PopOver = connect(mapState, mapDispatch)(_PopOver);
