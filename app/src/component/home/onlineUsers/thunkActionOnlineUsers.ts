import {Dispatch} from "redux";
import {socket} from "../../../util/utilSocket";
import {IdSocketVerb} from "../../../types/Types";
import {actionOnlineUsersUpdate} from "./actionOnlineUsers";

export const thunkActionOnlineUsers = (): any => (dispatch: Dispatch) => {
    socket.conn.on(IdSocketVerb.online_users, (userList: any) => {
        dispatch(actionOnlineUsersUpdate(userList));
        return;
    })
};