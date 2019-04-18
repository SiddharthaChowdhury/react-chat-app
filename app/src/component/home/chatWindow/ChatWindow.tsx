import {IReducerActivity} from "../activity/reducerActivity";
import {IdActivitySelectable} from "../activity/IdActivitySelectable";
import {IState} from "../../../config/IState";
import {selectActivity, selectActivityMessage} from "../activity/selectActivity";
import {connect} from "react-redux";
import * as React from "react";
import {Action, Dispatch} from "redux";
import {actionMessage} from "../activity/actionActivity";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, share} from "rxjs/operators";

interface IChatWindowState {
    activity: IReducerActivity;
    message: string;
}

interface IChatWindowDispatch {
    onMessage: (message: string) => Action<any>
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
        const {onMessage} = this.props;
        messageSubject$.subscribe({
            next: (data: any) => {
                console.log('next ', data);
                onMessage(data);
            }
        })
    }

    render() {
        const {activity:{selected, identity}} = this.props;

        if (!selected) {
            return null;
        }

        if (selected === IdActivitySelectable.user) {
            return (
                <div>
                    <h3>{identity}</h3>
                    <div className={'message-area'}/>
                    <input type={'search'} onChange={this.handleMessage}/>
                    <button>Send</button>
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
    onMessage: (message: string) => dispatch(actionMessage(message))
});

export const ChatWindow = connect(mapState, mapDispatch)(ChatWindowDOM);
