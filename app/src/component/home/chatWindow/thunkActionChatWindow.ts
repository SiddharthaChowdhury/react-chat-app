import {IdSocketVerb, IPrivateMessageTrigger, ISocketResponse} from "../../../types/Types";
import {Dispatch} from "redux";
import {actionActivitySetConversation} from "../activity/actionActivity";
import {socket} from "../../../util/utilSocket";

export const thunkActionSendMessage = (messageInfo: IPrivateMessageTrigger): any => (dispatch: Dispatch) => {
    // console.log(messageInfo)
    const {msg, recipient} = messageInfo;
    const timeStamp = + new Date();

    dispatch(actionActivitySetConversation({message: msg, sender: 'You', timestamp: timeStamp.toString()}, recipient));

    socket.conn.emit(IdSocketVerb.private_msg_trigger, messageInfo, (resp: ISocketResponse<any>) => {
        if (resp.error) {
            console.log(resp.error);
            alert('User offline');
            return;
        }

        return;
    });
}