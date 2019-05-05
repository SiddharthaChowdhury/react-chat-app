import {IReducerActivity} from "../activity/reducerActivity";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {IState} from "../../../config/IState";
import {selectActivity, selectActivityMessage} from "../../../selector/selectActivity";
import {connect} from "react-redux";
import * as React from "react";
import {Action, Dispatch} from "redux";
import {actionActivitySetConversation, actionSetActivityMessage} from "../activity/actionActivity";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, share} from "rxjs/operators";
import {IdSocketVerb, IPrivateMessageForward, IPrivateMessageTrigger} from "../../../types/Types";
import {thunkActionSendMessage} from "./thunkActionChatWindow";
import {socket} from "../../../util/utilSocket";
import {IActivityConversation} from "../activity/IActivityConversation";

interface IChatWindowState {
    activity: IReducerActivity;
    message: string;
}

interface IChatWindowDispatch {
    onMessage: (message: string) => Action<any>
    onMessageSend: (messageInfo: IPrivateMessageTrigger) => Action<any>,
    onMessageReceived: (conversationMsg: IActivityConversation, identity: string) => Action<any>
}

interface IChatWindowProps extends IChatWindowState, IChatWindowDispatch {}

export const messageSubject = new Subject();
export const messageSubject$ = messageSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    share()
);

class ChatWindowDOM extends React.PureComponent<IChatWindowProps> {

    componentDidMount(): void {
        const {onMessage, onMessageReceived} = this.props;
        messageSubject$.subscribe({
            next: (data: any) => {
                console.log('next ', data);
                onMessage(data);
            }
        });

        socket.conn.on(IdSocketVerb.private_msg_forward, (messageInfo: IPrivateMessageForward) => {
            const {msg, sender, timestamp} = messageInfo;
            onMessageReceived(
                {message: msg, sender, timestamp: timestamp || ''},
                sender
            );
            return;
        })
    }

    render() {
        const {activity:{selected, identity, message, conversation}, onMessageSend} = this.props;

        if (!selected && conversation!.length === 0) {
            return null;
        }

        if (selected === IdActivitySelectable.user || conversation!.length > 0) {
            return (
                <div>
                    <h3>{identity}</h3>
                    <div className={'message-area'}>
                        {conversation!.map(({message, timestamp, sender}: IActivityConversation, index: number) => {
                            return (
                                <div key={index}>
                                    <span>{message}</span> &nbsp;<b>{sender}</b>
                                </div>
                            )
                        })}
                    </div>
                    <input type={'search'} onChange={this.handleMessage}/>
                    <button onClick={() => onMessageSend({msg: message, recipient: identity})}>Send</button>
                </div>
            )
        }

        return (
            <div>Room coming soon</div>
        )
    }

    private handleMessage = (e: any) => {
        messageSubject.next(e.target.value)
    }
}

const mapState = (state: IState): IChatWindowState => ({
    activity: selectActivity(state),
    message: selectActivityMessage(state)
});

const mapDispatch = (dispatch: Dispatch): IChatWindowDispatch => ({
    onMessage: (message: string) => dispatch(actionSetActivityMessage(message)),
    onMessageSend: (messageInfo: IPrivateMessageTrigger) => dispatch(thunkActionSendMessage(messageInfo)),
    onMessageReceived: (conversationMsg: IActivityConversation, sender: string) => dispatch(actionActivitySetConversation(conversationMsg, sender))
});

export const ChatWindow = connect(mapState, mapDispatch)(ChatWindowDOM);
