export interface IActiveViewInfo {
    id: number;
    name: string[];
    type: IdActiveViewType
}

export enum IdActiveViewType {
    People = 'People',
    Channel = 'Channel',
    Welcome = 'Welcome'
}
