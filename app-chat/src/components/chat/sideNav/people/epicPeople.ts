import {Epic, ofType} from "redux-observable";
import {Action} from "redux";
import {IState} from "../../../../setup/IState";
import {actionPeopleSetList, IActionPeople, TypeActionPeople} from "./actionPeople";
import {mergeMap, map, catchError} from 'rxjs/operators';
import {IdLocalStorage, utilStorage} from "../../../../utils/utilPersistence/utilPersistence";
import {API} from "../../../../api/api";
import axios, {AxiosError, AxiosResponse} from "axios";
import {IdAppMessageType} from "../../../app/reducerApp";
import {Observable, of, from} from "rxjs";
import {IPeopleInfo} from "./IPeopleInfo";
import {actionAppMessageSet} from "../../../app/actionApp";

export const epicPeople: Epic<Action, Action, IState> = (action$, state$): Observable<any> =>
    action$.pipe(
        ofType(TypeActionPeople.REQUEST_LIST),
        mergeMap((action: IActionPeople) => {
            const token = utilStorage.local.getValue(IdLocalStorage.token);

            const {url} = API.GetUsers;
            return from(axios({
                method: "GET",
                url: url,
                headers: {token}
            })).pipe(
                map((response: AxiosResponse) => {
                    const userList: Array<IPeopleInfo> = response.data.data;

                    return actionPeopleSetList(userList)
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