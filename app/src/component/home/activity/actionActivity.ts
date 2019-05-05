import {IdActivitySelectable} from "./IdActivitySelectable";
import {Action} from "redux";
import {IActivityConversation} from "./IActivityConversation";

export enum TypeActionActivity {
    Select = "Activity > Select",
    Deselect = "Activity > Deselect",
    Message = "Activity > Message",
    SetConversation = "Activity > SetConversation"
}

export interface IActionActivity extends Action{
    select?: IdActivitySelectable;
    identity?: string;
    message?: string;
    conversation?: IActivityConversation;
    type: TypeActionActivity
}

export const actionActivitySelect = (select: IdActivitySelectable, identity: string): IActionActivity => ({
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

export const actionActivitySetConversation = (conversation: IActivityConversation, identity?: string, select = IdActivitySelectable.user): IActionActivity => ({
    conversation,
    select,
    identity,
    type: TypeActionActivity.SetConversation
})