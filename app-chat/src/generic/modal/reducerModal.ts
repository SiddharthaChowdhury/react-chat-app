import {IdModal} from "./IdModalRegistry";
import {IActionModal, TypeActionModal} from "./actionModal";

export interface IReducerModal {
    active: Array<IdModal>
}

const initialModalState: IReducerModal = {
    active: []
};

export default (state: IReducerModal = initialModalState, action: IActionModal): IReducerModal => {
    switch(action.type) {
        case TypeActionModal.MODAL_OPEN:
            return reducerModalOpen(state, action);
        case TypeActionModal.MODAL_CLOSE:
            return reducerModalClose(state, action);
        case TypeActionModal.MODAL_CLOSE_ALL:
            return reducerModalCloseAll(state, action);
        default:
            return state;
    }
}

const reducerModalClose = (state: IReducerModal, action: IActionModal): IReducerModal => {
    return {
        ...state,
        active: [...state.active.slice(1, state.active.length)]
    };
};

const reducerModalOpen = (state: IReducerModal, {modalId}: IActionModal): IReducerModal => {
    if (state.active.indexOf(modalId!) === -1 ) {
        return {
            ...state,
            active: [modalId!, ...state.active]
        };
    }

    return state;
};

const reducerModalCloseAll = (state: IReducerModal, action: IActionModal): IReducerModal => {
    return {
        ...state,
        active: []
    };
};