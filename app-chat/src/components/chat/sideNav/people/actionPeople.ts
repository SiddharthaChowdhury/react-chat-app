import {IPeopleInfo} from "./IPeopleInfo";

export enum TypeActionPeople {
    REQUEST_LIST = "People > List > Request",
    RESPONSE_LIST = "People > List > Response",

    USER_SET_HIGHLIGHT = "People > Highlight > SET"
}

export interface IActionPeople {
    userId?: number;
    highlight?: boolean;

    peopleList?: Array<IPeopleInfo>;
    type: TypeActionPeople;
}

export const actionPeopleGetList = (): IActionPeople => ({
    type: TypeActionPeople.REQUEST_LIST
});

export const actionPeopleSetList = (peopleList: Array<IPeopleInfo>): IActionPeople => ({
    peopleList,
    type: TypeActionPeople.RESPONSE_LIST
});


export const actionPeopleHighlight = (userId: number, highlight: boolean): IActionPeople => ({
    highlight,
    userId,
    type: TypeActionPeople.USER_SET_HIGHLIGHT
});
