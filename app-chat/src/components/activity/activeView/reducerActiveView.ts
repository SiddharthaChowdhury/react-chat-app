import {IActiveViewInfo, IdActiveViewType} from "./IActiveViewInfo";
import {IActionActiveView, TypeActionActiveView} from "./actionActiveView";

export interface IReducerActiveView extends IActiveViewInfo {}

// TODO: Get this values from localStorage later based on where user quit last time
const initialActiveViewState: IReducerActiveView = {
    id: 0,
    name: 'Welcome to this humble awesomeness!',
    type: IdActiveViewType.Welcome
};

export default (state: IReducerActiveView = initialActiveViewState, action: IActionActiveView): IReducerActiveView => {
    switch (action.type) {
        case TypeActionActiveView.UPDATE_ACTIVE_VIEW:
            return reducerUpdateActiveView(state, action);
        default:
            return state;
    }
}

export const reducerUpdateActiveView = (state: IReducerActiveView, {viewInfo}: IActionActiveView): IReducerActiveView => {
    return {
        ...state,
        ...viewInfo
    }
};
