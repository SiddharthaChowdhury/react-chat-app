import {IPeopleInfo} from "./IPeopleInfo";

export enum TypeActionPeople {
    REQUEST_LIST = "People > List > Request",
    RESPONSE_LIST = "People > List > Response"
}

export interface IActionPeople {
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