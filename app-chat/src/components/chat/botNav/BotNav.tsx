import * as React from 'react';
import {Action, Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import "./botNav.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {Camera, Send, TagFaces} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import {isMobileDevice} from "typed-responsive-react";
import {IUserInfoAuth} from "../../../customTypes/IUserInfo";
import {IReducerActiveView} from "../../activity/activeView/reducerActiveView";
import {selectApp} from "../../../selector/selectApp";
import {selectActivityActiveView} from "../../../selector/selectActivity";
import {IdMessageSource, IMessageInfo} from "../../../utils/utilSocket/IdSocketVerb";
import {actionMessageSent} from "../../activity/conversation/actionConversation";

interface IBotNavState {
    userInfo: IUserInfoAuth;
    activeView: IReducerActiveView;
}

interface IBotNavDispatch {
    onMessageSend: (messageInfo: IMessageInfo, messageIndex: number) => Action<any>;
}

interface IBotNavProps extends IBotNavState, IBotNavDispatch {
    deviceVariant: string
}

interface IBotNavOwnState {
    [id: string]: string
}
class BotNavDOM extends React.Component<IBotNavProps> {
    public readonly state: IBotNavOwnState = { '0' : ''};

    render () {
        const {activeView} = this.props;
        const textArea: React.CSSProperties = { width: this.props.deviceVariant === 'LaptopSmall' || isMobileDevice() ? '70%' : '77%'};
        const stateIndex = activeView.id + '' + activeView.type as string;

        return (
            <Grid item className={"content-bot"}>
                <div className="content-bot-wrapper">
                    {activeView.id > 0 &&
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
                            value={this.state[stateIndex] || ''}
                        />
                    </>
                    }
                </div>
            </Grid>
        )
    }

    private handleMessageInputChange = (e: any, stateIndex: string) => {
        this.setState({[stateIndex]: e.target.value})
    };

    private handleMessageSend = (stateIndex: string) => {
        const {activeView, userInfo} = this.props;
        const date = new Date();

        const messageInfo: IMessageInfo = {
            fromId: parseInt(userInfo.id),
            message: this.state[stateIndex],
            createdAt: date.toISOString(),
            source: IdMessageSource.User_Message
        };

        this.props.onMessageSend(messageInfo, activeView.id);
        this.setState({[stateIndex]: ''})
    }
}

const mapState = (state: IState): IBotNavState => ({
    userInfo: selectApp(state).userInfo!,
    activeView: selectActivityActiveView(state)
});
const mapDispatch = (dispatch: Dispatch): IBotNavDispatch => ({
    onMessageSend: (messageInfo: IMessageInfo, messageIndex: number) => dispatch(actionMessageSent(messageInfo, messageIndex))
});

export const BotNav = connect(mapState, mapDispatch)(BotNavDOM);
