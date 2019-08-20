import {socket} from "./utilSocket";
import {IdSocketKey, IMessageInfo, ISocketResponse} from "./IdSocketVerb";
import {actionSocketConnectionStatus} from "../../components/app/actionApp";
import {Store} from "../../setup/store";
import {IState} from "../../setup/IState";
import {selectApp} from "../../selector/selectApp";

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

export const socketPrivateMessageSend = (messageInfo: IMessageInfo, to: number) => {
    const {appInfo: {companyInfo}}: IState = Store.getState();

    socket.conn.emit(IdSocketKey.message, {...messageInfo, toId: to, companyId: companyInfo!.id}, (resp: ISocketResponse) => {
        if(resp.error) {
            console.log("Error! ", resp)
        } else {
            console.log('Socket received Message', resp);
        }
    });
};

export const socketPrivateMessageReceive = () => {
    const state: IState = Store.getState();
    console.log(selectApp(state))
};