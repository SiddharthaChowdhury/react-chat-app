import {NewPeople} from "../../components/chat/sideNav/people/newPeople/NewPeople";

export enum IdModal {
   AddNewPeople = "NewPeople"
}


export const ModalRegistry: any = {};
ModalRegistry[IdModal.AddNewPeople] = NewPeople;

