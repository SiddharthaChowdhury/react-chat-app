import {IActionLogin, TypeActionLogin} from "./actionLogin";
import {IAuthUserInfo} from "../../types/IUserInfo";

export interface IReducerLoginState {
    isLoggedIn?: boolean;
    userInfo?: IAuthUserInfo
}

export const initialLoginState: IReducerLoginState = {
    isLoggedIn: false,
};

export default (state: IReducerLoginState = initialLoginState, action: IActionLogin) => {
    switch (action.type) {
        case TypeActionLogin.Response:
            return reducerLoginResponse(state, action);
        default:
            return state;
    }
}

const reducerLoginResponse = (state: IReducerLoginState, action: IActionLogin): IReducerLoginState => {
    const {userInfo, isLoggedIn} = action;

    return ({
        ...state,
        isLoggedIn,
        userInfo
    })
};