import {IdSocketVerb, IPrivateMessageTrigger, ISocketResponse} from "../../../types/Types";
import {Dispatch} from "redux";
import {actionActivitySetConversation, actionSetActivityMessage} from "../activity/actionActivity";
import {socket} from "../../../util/utilSocket";

export const thunkActionSendMessage = (messageInfo: IPrivateMessageTrigger): any => (dispatch: Dispatch) => {
    const {msg, recipient, type, sender} = messageInfo;
    const timeStamp = + new Date();

    dispatch(actionActivitySetConversation(
        {
            id: timeStamp.toString(),
            message: msg,
            sender: 'You', // have sender object
            time: timeStamp.toString(),
            type
        },
        recipient
    ));
    dispatch(actionSetActivityMessage(''));

    socket.conn.emit(IdSocketVerb.private_msg_trigger, {...messageInfo, id: timeStamp.toString()}, (resp: ISocketResponse<any>) => {
        if (resp.error) {
            console.log(resp.error);
            alert('User offline');
            return;
        }

        return;
    });
};