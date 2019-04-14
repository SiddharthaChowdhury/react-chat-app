import {actionLoginResponse} from "./actionLogin";
import {Dispatch} from "redux";
import {IdSocketVerb, ISocketResponse} from "../../types/Types";
import {socket} from "../../util/utilSocket";
import {actionOnlineUsersUpdate} from "../home/onlineUsers/actionOnlineUsers";
import {IUserInfo} from "../../types/IUserInfo";

export const thunkActionRequestLogin = (userInfo: IUserInfo): any => (dispatch: Dispatch) => {
    socket.conn.emit(IdSocketVerb.register, userInfo.userName, (resp: ISocketResponse<any>) => {
        if (!resp.error) {
            dispatch(actionLoginResponse(userInfo,true));
            dispatch(actionOnlineUsersUpdate(resp.data));
            return;
        }

        return dispatch(actionLoginResponse())
    });
};
