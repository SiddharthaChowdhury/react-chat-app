import {socket} from "./utilSocket";
import {IdMessageSource, IdSocketKey, IMessageInfo, ISocketResponse} from "./IdSocketVerb";
import {Store} from "../../setup/store";
import {actionAppMessageSet} from "../../components/app/actionApp";
import {IdAppMessageType} from "../../components/app/reducerApp";
import {actionMessageReceive} from "../../components/activity/conversation/actionConversation";
import {selectActivityActiveView} from "../../selector/selectActivity";
import {IdActiveViewType} from "../../components/activity/activeView/IActiveViewInfo";
import {actionPeopleHighlight} from "../../components/chat/sideNav/people/actionPeople";

export default () => {
    socket.conn.on(IdSocketKey.messageIn, (payload: ISocketResponse) => {
        const {error, data} = payload;
        console.log("message received, ", data)
        if(error) {
            Store.dispatch(actionAppMessageSet([{
                text: 'Failed to receive messageOut',
                type: IdAppMessageType.ERROR
            }]));
            return;
        }

        const messageInfo: IMessageInfo = data;
        const {source, fromId, companyId} = messageInfo;
        const activeView = selectActivityActiveView(Store.getState());

        if(source === IdMessageSource.User_Message) {
            if(
                activeView.type === IdActiveViewType.People &&
                ( fromId === activeView.id )
            ) {
                // If active conversation is active in User Private Message
                Store.dispatch(actionMessageReceive(messageInfo, messageInfo.fromId));
            } else {
                Store.dispatch(actionMessageReceive(messageInfo, messageInfo.fromId));
                Store.dispatch(actionPeopleHighlight(fromId, true))
            }
        }

        if(source === IdMessageSource.Channel_Message) {
            if (
                activeView.type === IdActiveViewType.Channel &&
                ( companyId === activeView.id )
            ) {
                // If active conversation is active in CHANNEL
                Store.dispatch(actionMessageReceive(messageInfo, messageInfo.channelId!));
            } else {
                Store.dispatch(actionMessageReceive(messageInfo, messageInfo.channelId!));
                // TODO: Highlight channel
            }
        }
    })
}