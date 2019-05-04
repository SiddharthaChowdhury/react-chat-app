import * as React from "react";
import {IState} from "../../config/IState";
import {selectErrors} from "../../selector/selectErrors";
import {IErrorMessageInfo} from "./IErrorMessageInfo";
import {connect} from "react-redux";
import {IdErrorMessage} from "./IdErrorMessage";

interface IErrorMessageState {
    errors: Array<IErrorMessageInfo>
}

interface IErrorProps extends IErrorMessageState{}

const ErrorMessageDOM: React.FC<IErrorProps> = ({errors}) => {
    const firstError = errors[0];

    if (!firstError || firstError.category === IdErrorMessage.criticalError) {
        return null
    }

    return (
        <div>{firstError.message}</div>
    )
};

const mapState = (state: IState): IErrorMessageState => ({
    errors: selectErrors(state)
});

export const ErrorMessage = connect(mapState, undefined)(ErrorMessageDOM);
