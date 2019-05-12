import {Dispatch} from "redux";
import api from "../../../config/api";
import axios from "axios";

export const thunkActionFriends = (): any => (dispatch: Dispatch) => {
    // const {userName, password} = loginInfo;
    // const {url, method} = api.register;
    // axios({
    //     url,
    //     method,
    //     data: {
    //         email: userName,
    //         password
    //     }
    // })
    //     .then(function (response) {
    //         socket.conn.emit(IdSocketVerb.register, loginInfo.userName, (resp: ISocketResponse<any>) => {
    //             if (!resp.error) {
    //                 dispatch(actionLoginResponse(loginInfo,true));
    //                 dispatch(actionOnlineUsersUpdate(resp.data));
    //                 return;
    //             }
    //
    //             return dispatch(actionLoginResponse())
    //         });
    //     })
    //     .catch(function (error: any) {
    //         const {data: {msg}} = error.response;
    //
    //         return dispatch(actionSetErrorMessage(msg || 'Unhandled error!', IdErrorMessage.serverError))
    //     });
}