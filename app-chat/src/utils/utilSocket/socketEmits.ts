import {socket} from "./utilSocket";
import {IdSocketKey, IMessageInfo, ISocketResponse} from "./IdSocketVerb";
import {actionSocketConnectionStatus} from "../../components/app/actionApp";
import {Store} from "../../setup/store";
import {IState} from "../../setup/IState";

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

    socket.conn.emit(IdSocketKey.messageOut, {...messageInfo, toId: to, companyId: companyInfo!.id}, (resp: ISocketResponse) => {
        if(resp.error) {
            console.log("Error! ", resp)
        } else {
            console.log('Socket received Message', resp);
        }
    });
};
