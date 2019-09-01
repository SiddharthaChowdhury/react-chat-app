import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {Observable, of} from "rxjs";
import {switchMap} from 'rxjs/operators';
import {IState} from "../../../setup/IState";
import {actionMessageEnd, IActionConversation, TypeActionConversation} from "../actionConverstion";
import {$conn} from "../../../App";
import {IdMessageSource} from "../../../types/IMessage";


export const epicMessageSent: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionConversation.SEND),
        switchMap((action: IActionConversation) => {
            const {messageInfo} = action;

            const messagePayload = {...messageInfo!};
            if (messageInfo!.source === IdMessageSource.User_Message) {
                messagePayload.selfEcho = true;
                $conn.socket.emit("message", {...messagePayload});
            } else {
                $conn.socket.emit("channel-broadcast", {...messagePayload});
            }
            
            return of(actionMessageEnd())
        })
    );