export interface IPeopleInfo {
    id: number;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
}

export interface IPeopleList {
    important: Array<IPeopleInfo>
    more: Array<IPeopleInfo>
}