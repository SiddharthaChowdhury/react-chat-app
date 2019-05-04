import {Action} from "redux";
import {IdErrorMessage} from "./IdErrorMessage";
import {IErrorMessageInfo} from "./IErrorMessageInfo";

export enum TypeActionErrorMessage {
    Set = "ErrorMessage > Set"
}

export interface IActionErrorMessage extends IErrorMessageInfo, Action {
    type: TypeActionErrorMessage
}

export const actionSetErrorMessage = (message: string, category: IdErrorMessage): IActionErrorMessage => ({
    message,
    category,
    type: TypeActionErrorMessage.Set
});
