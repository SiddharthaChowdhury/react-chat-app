import {IUserInfoAuth} from "../../customTypes/IUserInfo";
import {ICompanyInfo} from "../../customTypes/ICompanyInfo";
import {IActionApp, TypeActionApp} from "./actionApp";
import {getDeviceTypeInfo, IDeviceInfo} from "typed-responsive-react";

export enum IdAppMessageType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    INFO = 'INFO'
}

export interface IAppMessage {
    type: IdAppMessageType;
    text: string;
}

export interface IReducerApp {
    isLoggedIn: boolean;
    userInfo?: IUserInfoAuth;
    companyInfo?: ICompanyInfo;
    message?: Array<IAppMessage>;
    deviceInfo: IDeviceInfo;
    socket: boolean;
}

const initialAppState: IReducerApp = {
    isLoggedIn: false,
    socket: false,
    deviceInfo: {...getDeviceTypeInfo()}
};

export default (state: IReducerApp = initialAppState, action: IActionApp): IReducerApp => {
    switch (action.type) {
        case TypeActionApp.LOGIN_RESPONSE:
            return reducerAppLoginResp(state, action);
        case TypeActionApp.SET_MESSAGE:
            return reducerAppMessageSet(state, action);
        case TypeActionApp.REMOVE_MESSAGE:
            return reducerAppMessageRemove(state, action);
        case TypeActionApp.UPDATE_DEVICE_INFO:
            return reducerAppUpdateDeviceInfo(state, action);
        case TypeActionApp.UPDATE_SOCKET_CONNECTION:
            return reducerAppUpdateSocketConn(state, action);

        default:
            return state;
    }
}

const reducerAppLoginResp = (state: IReducerApp, {userInfo, companyInfo, isLoggedIn}: IActionApp): IReducerApp => {
    return {
        ...state,
        userInfo: {...userInfo!},
        companyInfo: {...companyInfo!},
        isLoggedIn: isLoggedIn!
    }
};

const reducerAppMessageSet = (state: IReducerApp, {messageInfo}: IActionApp): IReducerApp => {
    return {
        ...state,
        message: [...messageInfo!]
    }
};

const reducerAppMessageRemove = (state: IReducerApp, {messageId}: IActionApp): IReducerApp => {
    if(!state.message) {
        return {
            ...state
        }
    }

    return {
        ...state,
        message: [...state.message.splice(messageId!, 1)!]
    }
};

const reducerAppUpdateDeviceInfo = (state: IReducerApp, {deviceInfo}: IActionApp): IReducerApp => {
    return {
        ...state,
        deviceInfo: {...deviceInfo!}
    }
};

const reducerAppUpdateSocketConn = (state: IReducerApp, {socket}: IActionApp): IReducerApp => {
    return {
        ...state,
        socket: socket || false
    }
};
