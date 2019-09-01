import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {Observable, from} from "rxjs";
import {switchMap} from "rxjs/operators";
import { IState } from "../../../setup/IState";
import { TypeActionAuth, actionAuthSignInComplete } from "../actionAuth";
import { IUserInfo } from "../../../types/IUser";
import { $conn } from "../../../App";
import {IChannelInfo} from "../../channels/IChannelInfo";
import {actionActiveChannelUpdate} from "../../activity/actionActive";

export const epicAuthSocketSignIn: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
  action$.pipe(
    ofType(TypeActionAuth.SIGN_IN_RESPONSE),
    switchMap( () => {
      const loggedInUser: IUserInfo | undefined = state$.value.auth.userInfo;
      const state = state$.value;

      if(loggedInUser) {
        $conn.socket.emit("sign-in", loggedInUser);
      }

      const actions: Array<Action> = []
      const defaultChannel = Object.values(state.channels.channels).find((channel: IChannelInfo) => channel.isDefault === true);

      if( defaultChannel ) {
          actions.push(actionActiveChannelUpdate(defaultChannel))
      }

      actions.push(actionAuthSignInComplete());

      return from(actions)
    })
  );