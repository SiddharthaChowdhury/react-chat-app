import {IState} from "../setup/IState";

export const selectPeople = (state: IState) => state.people;
export const selectPeopleAll = (state: IState) => state.people.allPeople;