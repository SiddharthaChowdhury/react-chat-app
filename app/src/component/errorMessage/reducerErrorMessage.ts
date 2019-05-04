import {IErrorMessageInfo} from "./IErrorMessageInfo";
import {IActionErrorMessage, TypeActionErrorMessage} from "./actionErrorMessage";

export interface IReducerErrorMessage {
    errors: Array<IErrorMessageInfo>
}

const initialErrorMessages: IReducerErrorMessage = {
    errors: []
};

export default (state: IReducerErrorMessage = initialErrorMessages, action: IActionErrorMessage) => {
    switch (action.type) {
        case TypeActionErrorMessage.Set:
            return reducerSetErrorMessage(state, action);
        default:
            return state
    }
}

const reducerSetErrorMessage = (state: IReducerErrorMessage, action: IActionErrorMessage): IReducerErrorMessage => {
    const {message, category} = action

    return {
        ...state,
        errors: [{message, category}, ...state.errors]
    }
};
