import { IReducerModal } from "../features/modal/reducerModal";
import { IReducerUsers } from "../features/users/reducerUsers";
import { IReducerAuth } from "../features/auth/reducerAuth";
import { IReducerActive } from "../features/activity/reducerActive";
import { IReducerConversation } from "../features/conversation/reducerConversation";
import {IReducerChannel} from "../features/channels/reducerChannel";

export interface IState {
    modal: IReducerModal;
    users: IReducerUsers;
    auth: IReducerAuth;
    active: IReducerActive;
    conversation: IReducerConversation;
    channels: IReducerChannel;
}