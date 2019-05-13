import {Dispatch} from "redux";
import api from "../../../config/api";
import axios from "axios";
import {actionUpdateFriendsSearch} from "./actionFriends";

export const thunkActionFriendsSearch = (str: string): any => (dispatch: Dispatch) => {
    const {url, method, headers} = api.searchFriend;
    axios({
        url,
        method,
        data: {str},
        headers: {
            ...headers
        }
    })
        .then(function (response) {
            const {data} = response.data;

            dispatch(actionUpdateFriendsSearch(data));
            return;
        })
        .catch(function (error: any) {
            console.log(error.response);
        });
};