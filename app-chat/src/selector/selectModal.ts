import {IState} from "../setup/IState";
import {IReducerModal} from "../generic/modal/reducerModal";
import {IdModal} from "../generic/modal/IdModalRegistry";

export const selectModal = (state: IState): IReducerModal => state.modal;
export const selectModalActive = (state: IState): Array<IdModal> => state.modal.active;