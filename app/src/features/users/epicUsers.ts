import { Epic, ofType } from "redux-observable";
import { Action } from "redux";
import { IState } from "../../setup/IState";
import { mergeMap, switchMap, catchError } from "rxjs/operators";
import {Observable, of, from} from "rxjs";
import { TypeActionUsers, IActionUsers, actionUsersComplete, actionUsersResponse } from "./actionUsers";
import { API } from "../../api/api";
import axios, {AxiosError, AxiosResponse} from 'axios';

export const epicUsers: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionUsers.UserListRequest),
        mergeMap((action: IActionUsers) => { 

            const {url} = API.GetUsers;
            return from(axios({
                method: "GET",
                url: url
            })).pipe(
                switchMap((response: AxiosResponse) => {
                    return from([
                        actionUsersResponse(response.data.data),
                        actionUsersComplete()
                    ]);
                }),
                catchError((error: AxiosError) => {
                    console.log('caught error:', error.response);
                    return of(actionUsersComplete);
                })
            )
        })
    )