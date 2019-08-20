import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {Observable} from "rxjs";
import {tap, take} from 'rxjs/operators';
import {IState} from "../../../../setup/IState";
import {IActionConversation, TypeActionConversation} from "../actionConversation";
import {socketPrivateMessageSend} from "../../../../utils/utilSocket/socketCall";

export const epicMessageSent: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionConversation.SEND),
        take(1),
        tap((action: IActionConversation) => {
            socketPrivateMessageSend(action.messageInfo!, action.messageIndex!)
        })
    );
