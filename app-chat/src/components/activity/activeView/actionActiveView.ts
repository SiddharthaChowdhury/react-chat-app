import {IActiveViewInfo} from "./IActiveViewInfo";

export enum TypeActionActiveView {
    UPDATE_ACTIVE_VIEW = "Active > View > Update"
}

export interface IActionActiveView {
    viewInfo: IActiveViewInfo;
    type: TypeActionActiveView;
}

export const actionActiveViewUpdate = (viewInfo: IActiveViewInfo): IActionActiveView => ({
    viewInfo,
    type: TypeActionActiveView.UPDATE_ACTIVE_VIEW
});
