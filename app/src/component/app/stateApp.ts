export interface IAppState {
    isLoggedIn: boolean;
    userInfo?: any;
    onlineUsers: any;
    messages: Array<any>;
}

export interface IUserInfo {
    userName: string
}

export const initialAppState: IAppState = {
    isLoggedIn: false,
    onlineUsers: [],
    messages: []
};
