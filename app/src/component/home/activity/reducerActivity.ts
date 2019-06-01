import {IdActivitySelectable} from "./IdActivitySelectable";
import {IActionActivity, TypeActionActivity} from "./actionActivity";
import {IAuthUserInfo} from "../../../types/IUserInfo";

export interface IReducerActivity {
    selected?: IdActivitySelectable
    identity?: IAuthUserInfo
    message?: string,
    discussion?: [],
    conversation?: any
}

const initialActivityState: IReducerActivity = {
    selected: undefined,
    identity: undefined,
    message: '',
    discussion: [], // chat room
    conversation: {}
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

const reducerActivityStoreConversation = (state: IReducerActivity, action: IActionActivity): IReducerActivity => {
    const {conversation, select, identity} = action;
    if( identity ) {
        const {id, name, email} = identity;

        if (!state.conversation[id!]) {
            state.conversation[id!] = []
        }

        state.conversation[id!].push({...conversation, ...identity});

        return ({
            ...state,
            selected: select,
            identity,
            conversation: {...state.conversation}
        })
    }

    return state
};
