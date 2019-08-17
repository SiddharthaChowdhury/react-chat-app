import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../../setup/IState";
import "./botNav.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {Camera, Send, TagFaces} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import {isMobileDevice} from "typed-responsive-react";

interface IBotNavState {
}

interface IBotNavDispatch {
}

interface IBotNavProps extends IBotNavState, IBotNavDispatch {
    deviceVariant: string
}

class BotNavDOM extends React.Component<IBotNavProps> {
    render () {
        const textArea: React.CSSProperties = { width: this.props.deviceVariant === 'LaptopSmall' || isMobileDevice() ? '70%' : '77%'};

        return (
            <Grid item className={"content-bot"}>
                <div className="content-bot-wrapper">
                    <div className="options-left">
                        <div className="option-btn"><FontAwesomeIcon className={"section-icon"} icon={faEllipsisH} /></div>
                        <div className="option-btn"><TagFaces/></div>
                    </div>
                    <div className="options-right">
                        <div className="option-btn"><Camera/></div>
                        <div className="option-btn"><Send/></div>
                    </div>
                    <textarea className="textarea" style={textArea} placeholder="Start cursing..."/>
                </div>
            </Grid>
        )
    }
}

const mapState = (state: IState): IBotNavState => ({});
const mapDispatch = (dispatch: Dispatch): IBotNavState => ({});

export const BotNav = connect(mapState, mapDispatch)(BotNavDOM);
