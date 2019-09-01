import React from 'react';
import { IState } from '../../setup/IState';
import {Action, Dispatch} from 'redux';
import { connect } from 'react-redux';
import "./botNav.scss";
import {IUserInfo} from "../../types/IUser";
import {IReducerActive} from "../activity/reducerActive";
import {IdMessageSource, IMessageInfo} from "../../types/IMessage";
import {IdActiveType} from "../activity/IdActiveType";
import {actionMessageSend} from "../conversation/actionConverstion";
import {isMobileDevice} from "typed-responsive-react";
import {Grid} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {Camera, Send, TagFaces} from "@material-ui/icons";

interface IBotNavState {
    loggedInUser: IUserInfo;
    active: IReducerActive;
}
interface IBotNavDispatch {
    onSendMessage: (messageInfo: IMessageInfo, toId: number | string) => Action<any>
}
interface IBotNavProps extends IBotNavState, IBotNavDispatch {
    deviceVariant: string;
}
interface IChatInputOwnState {
    [id: string]: string
}


class BotNavDOM extends React.Component<IBotNavProps> {
    public readonly state: IChatInputOwnState = { '0' : ''};

    render () {
        const {selectedUser, selectedChannel, type} = this.props.active;
        const textArea: React.CSSProperties = { width: this.props.deviceVariant === 'LaptopSmall' || isMobileDevice() ? '70%' : '77%'};
        const stateIndex = selectedUser ? selectedUser!.id.toString() : selectedChannel!.key + '' + type as string;

        return (
            <Grid item className={"content-bot"}>
                <div className="content-bot-wrapper">
                    <>
                        <div className="options-left">
                            <div className="option-btn"><FontAwesomeIcon className={"section-icon"} icon={faEllipsisH} /></div>
                            <div className="option-btn"><TagFaces/></div>
                        </div>
                        <div className="options-right">
                            <div className="option-btn"><Camera/></div>
                            <div className="option-btn" onClick={() => this.handleMessageSend(stateIndex)} ><Send/></div>
                        </div>
                        <textarea
                            className="textarea"
                            style={textArea}
                            placeholder="Start cursing..."
                            onChange={(e) => this.handleMessageInputChange(e, stateIndex)}
                            onKeyDown={(e) => this.handleEnter(e, stateIndex)}
                            value={this.state[stateIndex] || ''}
                        />
                    </>
                </div>
            </Grid>
        )
    }

    private handleMessageInputChange = (e: any, stateIndex: string) => {
        this.setState({[stateIndex]: e.target.value})
    };

    private handleMessageSend = (stateIndex: string) => {
        const {active: {selectedUser, type, selectedChannel}, loggedInUser, onSendMessage} = this.props;

        const messageText = this.state[stateIndex] ? this.state[stateIndex].trim() : undefined;
        if(!messageText) return;

        const messageInfo: IMessageInfo = {
            fromId: loggedInUser.id,
            message: {
                text: messageText
            },
            createdAt: + new Date(),
            source: IdMessageSource.User_Message
        };

        let toId = null;
        if (type === IdActiveType.Individual) {
            messageInfo.toId = selectedUser!.id;
            toId = selectedUser!.id
        } else if (type === IdActiveType.Channel) {
            messageInfo.channelId = selectedChannel!.key;
            messageInfo.source = IdMessageSource.Channel_Message;
            toId = selectedChannel!.key
        }

        onSendMessage(messageInfo, toId!);
        this.setState({[stateIndex]: ''});
    };

    private handleEnter = (evt: any, stateIndex: string) => {
        if (evt.keyCode === 13 && evt.shiftKey) {
            return;
        }
        if (evt.keyCode === 13 && !evt.shiftKey) {
            this.handleMessageSend(stateIndex);
            // this.setState({[stateIndex]: ''});
            return;
        }
    };
}

const mapState = (state: IState): IBotNavState => ({
    loggedInUser: state.auth.userInfo!,
    active: state.active!
});
const mapDispatch = (dispatch: Dispatch): IBotNavDispatch => ({
    onSendMessage: (messageInfo: IMessageInfo, toId: number | string) => dispatch(actionMessageSend(messageInfo, toId))
});

export const BotNav = connect(mapState, mapDispatch)(BotNavDOM);
