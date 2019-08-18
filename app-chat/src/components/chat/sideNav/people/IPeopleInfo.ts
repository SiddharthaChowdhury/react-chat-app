export interface IPeopleInfo {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
}

export interface IPeopleList {
    important: Array<IPeopleInfo>
    more: Array<IPeopleInfo>
}