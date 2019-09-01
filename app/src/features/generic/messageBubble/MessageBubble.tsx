import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import {IMessageInfo} from "../../../types/IMessage";
import {IAllUsers} from "../../users/reducerUsers";
import "./messageBubble.scss";

interface IMessageBubbleState {
    allUsers: IAllUsers;
}

interface IMessageBubbleDispatch {
}

interface IMessageBubbleProps extends IMessageBubbleState, IMessageBubbleDispatch {
    messageInfo: IMessageInfo
}

class MessageBubbleDOM extends React.Component<IMessageBubbleProps> {
    public render () {
        const {allUsers, messageInfo:{fromId, message, createdAt }} = this.props;
        const user = allUsers[fromId];
        const timeStamp = new Date(createdAt).toLocaleTimeString();
        const style: React.CSSProperties = {
            backgroundImage: `url(${user.avatar})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center, center'
        };

        return (
            <div className="message-wrap">
                <div className="message-icon" style={style}/>
                <div className="message-content">
                    <div className="message-content-name">
                        <div className="name">{user.name}</div>
                        <div className="time">{timeStamp}</div>
                    </div>
                    <div className="message-content-text">
                        {message.text}
                    </div>
                </div>
            </div>
        )
    }
};

const mapState = (state: IState): IMessageBubbleState => ({
    allUsers: state.users.allUsers
})
const mapDispatch = (dispatch: Dispatch): IMessageBubbleDispatch => ({})

export const MessageBubble = connect(mapState, mapDispatch)(MessageBubbleDOM);
