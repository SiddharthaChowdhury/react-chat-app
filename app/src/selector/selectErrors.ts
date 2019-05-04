import {IState} from "../config/IState";
import {IErrorMessageInfo} from "../component/errorMessage/IErrorMessageInfo";

export const selectErrors = (state: IState): Array<IErrorMessageInfo> => state.errors.errors;