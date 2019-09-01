import {combineReducers} from "redux";
import {IState} from "./IState";
import { reducerModal } from "../features/modal/reducerModal";
import reducerUsers from "../features/users/reducerUsers";
import reducerAuth from "../features/auth/reducerAuth";
import reducerActive from "../features/activity/reducerActive";
import reducerConversation from "../features/conversation/reducerConversation";
import reducerChannel from "../features/channels/reducerChannel";

export default combineReducers<IState>({
   modal: reducerModal,
   users: reducerUsers,
   auth: reducerAuth,
   active: reducerActive,
   conversation: reducerConversation,
   channels: reducerChannel
})