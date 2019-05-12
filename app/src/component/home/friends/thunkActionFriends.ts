import {Dispatch} from "redux";
import api from "../../../config/api";
import axios from "axios";
import {actionUpdateFriendsList} from "./actionFriends";

export const thunkActionFriends = (): any => (dispatch: Dispatch) => {
    // const {userName, password} = loginInfo;
    const {url, method, headers} = api.friendList;
    axios({
        url,
        method,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            ...headers
        }
    })
    .then(function (response) {
        const {data} = response.data;

        dispatch(actionUpdateFriendsList(data));
        return;
    })
    .catch(function (error: any) {
        console.log(error.response);
    });
}