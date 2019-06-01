import {IdActivitySelectable} from "./IdActivitySelectable";
import {Action} from "redux";
import {IActivityMessages} from "./IActivityConversation";
import {IAuthUserInfo} from "../../../types/IUserInfo";

export enum TypeActionActivity {
    Select = "Activity > Select",
    Deselect = "Activity > Deselect",
    Message = "Activity > Message",
    SetConversation = "Activity > SetConversation"
}

export interface IActionActivity extends Action{
    select?: IdActivitySelectable;
    identity?: IAuthUserInfo; // IUserInfo
    message?: string;
    conversation?: IActivityMessages;
    type: TypeActionActivity
}

export const actionActivitySelect = (select: IdActivitySelectable, identity: IAuthUserInfo): IActionActivity => ({
    select,
    identity,
    type: TypeActionActivity.Select
});

export const actionDeselectActivty = (): IActionActivity => ({
    type: TypeActionActivity.Deselect
});

export const actionSetActivityMessage = (message: string): IActionActivity => ({
    message,
    type: TypeActionActivity.Message
});

export const actionActivitySetConversation = (conversation: IActivityMessages, identity?: IAuthUserInfo, select = IdActivitySelectable.user): IActionActivity => ({
    conversation: conversation,
    select,
    identity,
    type: TypeActionActivity.SetConversation
});
