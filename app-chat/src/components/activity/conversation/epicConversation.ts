import {combineEpics} from "redux-observable";
import {epicMessageSent} from "./epics/epicMessageSent";

export const epicConversation = combineEpics(
    epicMessageSent
);