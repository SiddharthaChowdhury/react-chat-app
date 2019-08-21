import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {Observable, of} from "rxjs";
import {switchMap} from 'rxjs/operators';
import {IState} from "../../../../setup/IState";
import {actionMessageEnd, IActionConversation, TypeActionConversation} from "../actionConversation";
import {socketPrivateMessageSend} from "../../../../utils/utilSocket/socketEmits";

export const epicMessageSent: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionConversation.SEND),
        switchMap((action: IActionConversation) => {
            socketPrivateMessageSend(action.messageInfo!, action.messageIndex!)
            return of(actionMessageEnd())
        })
    );
