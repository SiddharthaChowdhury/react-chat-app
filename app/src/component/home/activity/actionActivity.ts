import {IdActivitySelectable} from "./IdActivitySelectable";
import {Action} from "redux";

export enum TypeActionActivity {
    Select = "Activity > Select",
    Deselect = "Activity > Deselect",
    Message = "Activity > Message"
}

export interface IActionActivity extends Action{
    select?: IdActivitySelectable;
    identity?: string;
    message?: string;
    type: TypeActionActivity
}

export const actionSelectActivity = (select: IdActivitySelectable, identity: string): IActionActivity => ({
    select,
    identity,
    type: TypeActionActivity.Select
});

export const actionDeselectActivty = (): IActionActivity => ({
    type: TypeActionActivity.Deselect
});

export const actionMessage = (message: string): IActionActivity => ({
    message,
    type: TypeActionActivity.Message
});
