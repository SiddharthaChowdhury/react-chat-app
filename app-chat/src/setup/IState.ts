import {IReducerApp} from "../components/app/reducerApp";
import {IReducerPeople} from "../components/chat/sideNav/people/reducerPeople";

export interface IState {
    appInfo: IReducerApp;
    people: IReducerPeople;
}