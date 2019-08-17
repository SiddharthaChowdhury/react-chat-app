import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {IState} from "../../setup/IState";
import {actionAppLoginResponse, actionAppMessageSet, IActionApp, TypeActionApp} from "./actionApp";
import {mergeMap, map, catchError} from 'rxjs/operators';
import {Observable, of, from} from "rxjs";
import {IdLocalStorage, PersistenceMode, utilStorage} from "../../utils/utilPersistence/utilPersistence";
import {API} from "../../api/api";
import axios, {AxiosError, AxiosResponse} from 'axios';
import {IdAppMessageType} from "./reducerApp";
import {IUserInfoAuth} from "../../customTypes/IUserInfo";
import {ICompanyInfo} from "../../customTypes/ICompanyInfo";

export const epicLogin: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionApp.LOGIN_REQUEST),
        mergeMap((action: IActionApp) => {
            const token = utilStorage.local.getValue(IdLocalStorage.token);

            //TODO: need to implement guard here
            if(!token) {
                utilStorage.local.setValue(IdLocalStorage.token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic2lkQGdnLmNvbSIsImZpcnN0TmFtZSI6IlNpZGRoYXJ0aGEiLCJsYXN0TmFtZSI6IkNob3dkaHVyeSIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJEdW11eSBpbmMiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTE3VDEwOjU1OjU4LjE4N1oiLCJpYXQiOjE1NjYwMzkzNTh9.08j5z_wIl9gtOFMMKSBPfwetlUsuh7_xWjVxQqulgik", PersistenceMode.Write, true);
                return of(actionAppMessageSet([
                    {
                        text: 'Relogin failed',
                        type: IdAppMessageType.ERROR
                    }
                ]))
            }

            const {url} = API.Authenticate;
            return from(axios({
                method: "POST",
                url: url,
                headers: {token}
            })).pipe(
                map((response: AxiosResponse) => {
                    const {userId, email, firstName, lastName, companyId, companyName, avatar} = response.data.data;
                    const userInfo: IUserInfoAuth = {
                        id: userId,
                        email,
                        firstName,
                        lastName,
                        avatar
                    };

                    const companyInfo: ICompanyInfo = {
                        id: companyId,
                        name: companyName
                    };

                    return actionAppLoginResponse(userInfo, companyInfo, true)
                }),
                catchError((error: AxiosError) => {
                    console.log('caught error:', error.response!.data.error);
                    return of(
                        actionAppMessageSet([{
                            text: error.response!.data.error,
                            type: IdAppMessageType.ERROR
                        }])
                    );
                })
            )
        })
    );