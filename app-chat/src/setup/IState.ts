import {IReducerApp} from "../components/app/reducerApp";
import {IReducerPeople} from "../components/chat/sideNav/people/reducerPeople";
import {IReducerModal} from "../generic/modal/reducerModal";

export interface IState {
    appInfo: IReducerApp;
    people: IReducerPeople;
    modal: IReducerModal
}