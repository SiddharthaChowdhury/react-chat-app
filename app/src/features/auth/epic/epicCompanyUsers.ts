import { Epic, ofType } from "redux-observable";
import { Action } from "redux";
import { mergeMap, switchMap, catchError } from "rxjs/operators";
import {Observable, of, from} from "rxjs";
import axios, {AxiosError, AxiosResponse} from 'axios';
import { IState } from "../../../setup/IState";
import { API } from "../../../api/api";
import { actionAuthSignInResponse, IActionAuth, TypeActionAuth, actionAuthSignInError } from "../actionAuth";
import { actionUsersResponse } from "../../users/actionUsers";
import {actionAddChannels} from "../../channels/actionChannel";

export const epicCompanyUsers: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionAuth.SIGN_IN_REQUEST),
        mergeMap((action: IActionAuth) => { 
            const {userInfo} = action;
            const {url} = API.GetCompanyUsers;
            return from(axios({
                method: "GET",
                url: url + userInfo!.companyId
            })).pipe(
                switchMap((response: AxiosResponse) => {
                    return from([
                        actionUsersResponse(response.data.data),
                        actionAddChannels([{key: 'channel'+userInfo!.companyId, name: userInfo!.companyName!, isDefault: true}]),
                        actionAuthSignInResponse(userInfo!)
                    ]);
                }),
                catchError((error: AxiosError) => {
                    console.log('caught error:', error.response);
                    return of(actionAuthSignInError);
                })
            )
        })
    );