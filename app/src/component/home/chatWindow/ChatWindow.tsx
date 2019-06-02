import {IReducerActivity} from "../activity/reducerActivity";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {IState} from "../../../config/IState";
import {selectActivity, selectActivityMessage} from "../../../selector/selectActivity";
import {connect} from "react-redux";
import * as React from "react";
import {Action, Dispatch} from "redux";
import {
    actionActivitySetConversation,
    actionSetActivityMessage
} from "../activity/actionActivity";
import {Subject} from "rxjs";
import {distinctUntilChanged, share} from "rxjs/operators";
import {IdMessageType, IdSocketVerb, IPrivateMessageForward, IPrivateMessageTrigger} from "../../../types/Types";
import {thunkActionSendMessage} from "./thunkActionChatWindow";
import {socket} from "../../../util/utilSocket";
import {IActivityMessages} from "../activity/IActivityConversation";
import "./chatWindow.scss";
import {IAuthUserInfo} from "../../../types/IUserInfo";
import {Grid} from "@material-ui/core";
import {selectOnline} from "../../../selector/selectOnline";
import {selectUserInfo} from "../../../selector/selectUserInfo";

interface IChatWindowState {
    userInfo: IAuthUserInfo,
    onlineUsers: Array<IAuthUserInfo>,
    activity: IReducerActivity;
    message: string;
}

interface IChatWindowDispatch {
    onMessage: (message: string) => Action<any>
    onMessageSend: (messageInfo: IPrivateMessageTrigger) => Action<any>,
    onMessageReceived: (conversationMsg: IActivityMessages, identity: IAuthUserInfo) => Action<any>
}

interface IChatWindowProps extends IChatWindowState, IChatWindowDispatch {}

export const messageSubject = new Subject();
export const messageSubject$ = messageSubject.pipe(
    // debounceTime(500),
    distinctUntilChanged(),
    share()
);

class ChatWindowDOM extends React.PureComponent<IChatWindowProps> {
    public readonly state: any;

    constructor(props: IChatWindowProps) {
        super(props);
        this.state = {input: '', onlineUsers: this.props.onlineUsers}
    }

    componentWillReceiveProps(nextProps: Readonly<IChatWindowProps>): void {
        const { onlineUsers } = nextProps;
        this.setState({onlineUsers})
    }

    componentDidMount(): void {
        const {onMessage, onMessageReceived} = this.props;

        messageSubject$.subscribe({
            next: (data: any) => {
                onMessage(data);
            }
        });

        socket.conn.on(IdSocketVerb.private_msg_forward, (messageInfo: IPrivateMessageForward) => {
            const {id, msg, sender, timestamp, type} = messageInfo;
            const senderInfo = this.state.onlineUsers.find((user: IAuthUserInfo) => {
                return user.id === sender
            });

            if (senderInfo && sender) {
                onMessageReceived(
                    {
                        id,
                        message: msg,
                        sender,
                        time: timestamp!,
                        type
                    },
                    senderInfo
                );
            }
            return;
        })
    }

    render() {
        const {activity:{selected, identity, conversation}} = this.props;

        if (!selected && conversation && Object.keys(conversation).length === 0) {
            // todo: choose self
            return (
                null
            );
        }

        if ((identity && selected === IdActivitySelectable.user) || (conversation && Object.keys(conversation).length > 0)) {
            const {email, name, id}: IAuthUserInfo = identity!;

            return (
                <Grid container className={"chatWindowContainer"}>
                    <Grid item className={"chatIdentityContainer"}>
                        {email}
                    </Grid>

                    <Grid item className={"chatWindowWrapper"}>
                        <Grid item id={"chatContainer"} className={"discussion"}>
                            {(conversation[id!] || []).map(({message, time, sender, name, email}: any, index: number) => {
                                if (sender === 'You') {
                                    let orderClass = '';

                                    if (!conversation[id!][index - 1] || conversation[id!][index - 1].sender !== 'You') {
                                        orderClass = 'sender-first'
                                    } else if (!conversation[id!][index + 1] || conversation[id!][index + 1].sender !== 'You') {
                                        orderClass = 'sender-last'
                                    } else {
                                        orderClass = 'sender-middle';
                                    }

                                    return (
                                        // New component bubble
                                        <div className={"msgSegment"} key={index}>
                                            <div className={"bubble sender "+ orderClass} data-userid={sender}>
                                                <span>{message}</span>
                                            </div>
                                        </div>
                                    )
                                }

                                let orderClass = '';

                                if (!conversation[id!][index - 1] || conversation[id!][index - 1].sender === 'You') {
                                    orderClass = 'recipient-first'
                                } else if (!conversation[id!][index + 1] || conversation[id!][index + 1].sender === 'You') {
                                    orderClass = 'recipient-last'
                                } else {
                                    orderClass = 'recipient-middle';
                                }

                                return (
                                    // New component bubble
                                    <div className={"msgSegment"} key={index}>
                                        <div className={"bubble recipient " + orderClass} data-userid={sender}>
                                            <span>{message}</span> &nbsp;<small><i>{email}</i></small>
                                        </div>
                                    </div>
                                )
                            })}
                        </Grid>
                        <Grid className={"chatInputContainer"}>
                            <input className={"chatInput"} type={"search"} onChange={this.handleOnChange} onKeyDown={this.handleOnKeyDown} value={this.state.input}/>
                            <button disabled={true}>#</button>
                            <button onClick={this.onSubmit}>Send</button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return (
            <div>Room coming soon</div>
        )
    }

    componentDidUpdate (): void {
        this.triggerAutoScrollBottom()
    }

    private triggerAutoScrollBottom = () => {
        const element = document.getElementById("chatContainer");

        if( element ) {
            element.scrollTop = element.scrollHeight - element.clientHeight
        }
    };

    private handleOnKeyDown = (e: any) => {
        if (e.key === "Enter") {
            this.onSubmit();
            this.setState({input: ''})
        }
    };

    private onSubmit = () => {
        const {activity:{identity, message}, onMessageSend} = this.props;

        if (identity && message) {
            onMessageSend({
                msg: message,
                recipient: identity,
                type: IdMessageType.text
            });
        }
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        messageSubject.next(e.target.value);
        this.setState({input: e.target.value});
    };
}

const mapState = (state: IState): IChatWindowState => ({
    userInfo: selectUserInfo(state),
    onlineUsers: selectOnline(state),
    activity: selectActivity(state),
    message: selectActivityMessage(state)
});

const mapDispatch = (dispatch: Dispatch): IChatWindowDispatch => ({
    onMessage: (message: string) => dispatch(actionSetActivityMessage(message)),
    onMessageSend: (messageInfo: IPrivateMessageTrigger) => dispatch(thunkActionSendMessage(messageInfo)),
    onMessageReceived: (conversationMsg: IActivityMessages, sender: IAuthUserInfo) => dispatch(actionActivitySetConversation(conversationMsg, sender))
});

export const ChatWindow = connect(mapState, mapDispatch)(ChatWindowDOM);
