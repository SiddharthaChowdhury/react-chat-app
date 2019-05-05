import {IdActivitySelectable} from "./IdActivitySelectable";
import {IActionActivity, TypeActionActivity} from "./actionActivity";
import {IActivityConversation} from "./IActivityConversation";

export interface IReducerActivity {
    selected?: IdActivitySelectable
    identity?: string
    message?: string
    conversation?: Array<IActivityConversation>
}

const initialActivityState: IReducerActivity = {
    selected: undefined,
    identity: '',
    message: '',
    conversation: []
};

export default (state: IReducerActivity = initialActivityState, action: IActionActivity): IReducerActivity => {
    switch (action.type) {
        case TypeActionActivity.Select:
            return reducerActivitySelect(state, action);
        case TypeActionActivity.Message:
            return reducerActivitySetTypings(state, action);
        case TypeActionActivity.SetConversation:
            return reducerActivityStoreConversation(state, action);
        default:
            return state;
    }
}

const reducerActivitySelect = (state: IReducerActivity, action: IActionActivity): IReducerActivity => ({
    ...state,
    selected: action.select,
    identity: action.identity
});

const reducerActivitySetTypings = (state: IReducerActivity, {message}: IActionActivity): IReducerActivity => ({
    ...state,
    message
});

const reducerActivityStoreConversation = (state: IReducerActivity, {conversation, select, identity}: IActionActivity): IReducerActivity => ({
    ...state,
    selected: select,
    identity,
    conversation: [...state.conversation!, {...conversation!}]
});