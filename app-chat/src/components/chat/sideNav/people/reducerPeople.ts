import {IPeopleInfo} from "./IPeopleInfo";
import {IActionPeople, TypeActionPeople} from "./actionPeople";

export interface IReducerPeople {
    allPeople: Array<IPeopleInfo>
}

const initialPeopleState: IReducerPeople = {
    allPeople: []
};

export default (state: IReducerPeople = initialPeopleState, action: IActionPeople): IReducerPeople => {
    switch (action.type) {
        case TypeActionPeople.RESPONSE_LIST:
            return reducerPeopleListSet(state, action);
        default:
            return state;
    }
};

const reducerPeopleListSet = (state: IReducerPeople, {peopleList}:IActionPeople):IReducerPeople => {
    return {
        ...state,
        allPeople: peopleList!
    }
}