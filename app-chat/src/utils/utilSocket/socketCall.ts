import {socket} from "./utilSocket";
import {IdSocketKey, ISocketResponse} from "./IdSocketVerb";
import {actionSocketConnectionStatus} from "../../components/app/actionApp";
import {Store} from "../../setup/store";

export const socketRegister = (companyId: number, userId: number) => {
    socket.conn.emit(IdSocketKey.registerUser, {companyId, userId}, (resp: ISocketResponse) => {
        if(resp.error) {
            Store.dispatch(actionSocketConnectionStatus(false))
        } else {
            console.log('socket Connection Up');
            Store.dispatch(actionSocketConnectionStatus(true))
        }
    })
};