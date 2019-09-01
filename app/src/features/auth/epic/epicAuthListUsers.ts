import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import { IState } from "../../../setup/IState";
import { TypeActionUsers } from "../../users/actionUsers";
import { actionModalOpen } from "../../modal/actionModal";
import { IdModalRegistry } from "../../modal/IdModalRegistry";

export const epicAuthListUsers: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
  action$.pipe(
    ofType(TypeActionUsers.UserListComplete),
    switchMap( () => {
      return of(actionModalOpen(IdModalRegistry.ModaltempLogin))
    })
  )