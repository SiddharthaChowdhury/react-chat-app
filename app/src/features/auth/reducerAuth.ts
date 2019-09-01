import { IUserInfo } from "../../types/IUser";
import { IActionAuth, TypeActionAuth } from "./actionAuth";

export interface IReducerAuth {
    userInfo?: IUserInfo,
    live: boolean,
    isLoggedIn: boolean,
}

const initial: IReducerAuth = {
    live: false,
    isLoggedIn: false
}

export default (state: IReducerAuth = initial, action: IActionAuth): IReducerAuth => {
    switch(action.type) {
        case TypeActionAuth.SIGN_IN_RESPONSE:
            return {
                ...state,
                userInfo: action.userInfo!,
                isLoggedIn: true
            }
        case TypeActionAuth.SOCKET_STATUS:
            return {
                ...state,
                live: action.socketStatus || false
            }
        default:
            return state
    }
}