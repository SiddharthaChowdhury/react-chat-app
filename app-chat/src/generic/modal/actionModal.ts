import {IdModal} from "./IdModalRegistry";

export enum TypeActionModal {
    MODAL_OPEN = "Modal > Open",
    MODAL_CLOSE = "Modal > Close",
    MODAL_CLOSE_ALL = "Modal > Close > ALL",
}

export interface IActionModal {
    modalId?: IdModal
    type: TypeActionModal
}

export const actionModalOpen = (modalId: IdModal): IActionModal => ({
    modalId,
    type: TypeActionModal.MODAL_OPEN
});

export const actionModalClose = (): IActionModal => ({
    type: TypeActionModal.MODAL_CLOSE
});

export const actionModalCloseAll = (): IActionModal => ({
    type: TypeActionModal.MODAL_CLOSE_ALL
});
