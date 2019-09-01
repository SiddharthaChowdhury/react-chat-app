import React from 'react';
import {IState} from '../../setup/IState';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import "./chatBox.scss";
import {IReducerActive} from '../activity/reducerActive';
import {IReducerConversation} from '../conversation/reducerConversation';
import {IAllUsers} from '../users/reducerUsers';
import {IdActiveType} from '../activity/IdActiveType';
import {IMessageInfo} from '../../types/IMessage';
import {MessageBubble} from "../generic/messageBubble/MessageBubble";

interface IChatBoxState {
    active: IReducerActive;
    conversation: IReducerConversation;
    allUsers: IAllUsers;
}
interface IChatBoxDispatch {}
interface IChatBoxProps extends IChatBoxState, IChatBoxDispatch {}

class ChatBoxDOM extends React.Component<IChatBoxProps> {
    render (){
        const conversation: Array<IMessageInfo> = this.getConversation() || [];

        return(
            <div className={'chatBox'}>
                {conversation.map((messageInfo: IMessageInfo, index: number) => {
                    return (
                        <div key={index}>
                            <MessageBubble messageInfo={messageInfo}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    private getConversation = () => {
        const {active, conversation, allUsers} = this.props;

        if(!active || !conversation || !allUsers) {
            return []
        }

        if(active.type === IdActiveType.Individual) {
            return conversation.user[active.selectedUser!.id]
        } else if (active.type === IdActiveType.Channel) {
            return conversation.channel[active.selectedChannel!.key]
        }

        return []
    }
}

const mapState = (state: IState): IChatBoxState => ({
    active: state.active,
    conversation: state.conversation,
    allUsers: state.users.allUsers
});
const mapDispatch = (state: Dispatch): IChatBoxDispatch => ({});

export const ChatBox = connect(mapState, mapDispatch)(ChatBoxDOM);
