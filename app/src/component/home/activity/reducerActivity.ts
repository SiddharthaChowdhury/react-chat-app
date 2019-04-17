import {IdActivitySelectable} from "./IdActivitySelectable";
import {IActionActivity, TypeActionActivity} from "./actionActivity";

export interface IReducerActivity {
    selected?: IdActivitySelectable
    identity?: string
}

const initialActivityState: IReducerActivity = {};

export default (state: IReducerActivity = initialActivityState, action: IActionActivity): IReducerActivity => {
    switch (action.type) {
        case TypeActionActivity.Select:
            return reducerSelect(state, action);
        default:
            return state
    }
}


const reducerSelect = (state: IReducerActivity, action: IActionActivity): IReducerActivity => ({
    ...state,
    selected: action.select,
    identity: action.identity
});