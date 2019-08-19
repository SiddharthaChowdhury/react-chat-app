import {IReducerApp} from "../components/app/reducerApp";
import {IReducerPeople} from "../components/chat/sideNav/people/reducerPeople";
import {IReducerModal} from "../generic/modal/reducerModal";
import {IReducerActivity} from "../components/activity/reducerActivity";

export interface IState {
    appInfo: IReducerApp;
    people: IReducerPeople;
    modal: IReducerModal;
    activity: IReducerActivity
}