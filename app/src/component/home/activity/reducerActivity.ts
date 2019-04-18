import {IdActivitySelectable} from "./IdActivitySelectable";
import {IActionActivity, TypeActionActivity} from "./actionActivity";

export interface IReducerActivity {
    selected?: IdActivitySelectable
    identity?: string
    message?: string
}

const initialActivityState: IReducerActivity = {};

export default (state: IReducerActivity = initialActivityState, action: IActionActivity): IReducerActivity => {
    switch (action.type) {
        case TypeActionActivity.Select:
            return reducerSelect(state, action);
        case TypeActionActivity.Message:
            return reducerActivity(state, action);
        default:
            return state;
    }
}

const reducerSelect = (state: IReducerActivity, action: IActionActivity): IReducerActivity => ({
    ...state,
    selected: action.select,
    identity: action.identity
});

const reducerActivity = (state: IReducerActivity, {message}: IActionActivity): IReducerActivity => ({
    ...state,
    message
});
