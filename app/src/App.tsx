import React from 'react';
import Modal from './features/modal/Modal';
import {Action, Dispatch} from 'redux';
import {IState} from './setup/IState';
import {
	actionUsersOnlineUserStatusUpdate,
	actionUsersPendingUpdate,
	actionUsersRequest
} from './features/users/actionUsers';
import {connect} from 'react-redux';
import {IReducerAuth} from './features/auth/reducerAuth';
import {Chat} from './pages/chat/Chat';
import {Welcome} from './pages/welcome/Welcome';
import {UtilSocket} from './util/socket/utilSocket';
import {IdMessageSource, IMessageInfo} from './types/IMessage';
import {actionMessageReceive} from './features/conversation/actionConverstion';
import {IReducerActive} from "./features/activity/reducerActive";
import {IdActiveType} from "./features/activity/IdActiveType";
import {actionChannelPendingUpdate} from "./features/channels/actionChannel";

interface IAppState {
	active: IReducerActive;
	authInfo: IReducerAuth;
}
interface IAppDispatch {
	onGetUserList: () => Action<any>;
	onMessageReceived: (messageInfo: IMessageInfo, fromId: number | string) => Action<any>;
	onUpdateUserPendingMessage: (userId: number) => Action<any>;
	onUpdateChannelPendingMessage: (channelKey: string) => Action<any>;
	onOnlineUserUpdate: (userIds: Array<string>) => Action<any>;
}
interface IAppProps extends IAppState, IAppDispatch {}

export const $conn = new UtilSocket();

class AppDOM extends React.Component<IAppProps> {
	public render () {
		const {isLoggedIn} = this.props.authInfo;
		return (
			<div className="App">
				<Modal/>
				{isLoggedIn ? <Chat/> : <Welcome/>}
			</div>
		)
	};

	public componentDidMount () {
		this.props.onGetUserList();
		this.setupSocketListeners();
	};

	private setupSocketListeners = () => {
		$conn.socket.on("message", this.onMessageReceived);
		$conn.socket.on("channel-broadcast", this.onChannelMessageReceived);
		$conn.socket.on("online-users", this.onOnlineUserUpdate);
		$conn.socket.on("reconnect", this.onReconnection);
		$conn.socket.on("disconnect", this.onClientDisconnected);
	};

	private onOnlineUserUpdate = (onlineUsers: Array<string>) => {
		console.log(onlineUsers);
		this.props.onOnlineUserUpdate(onlineUsers);
	};

	private onClientDisconnected = () => {
		console.log(
		"Connection Lost from server please check your connection.",
		"Error!"
		);
	};

	private onReconnection = () => {
		console.log('trying reconnect');
		if(!this.props) {
			return;
		}
		const {isLoggedIn, userInfo} = this.props.authInfo;
		if (isLoggedIn && userInfo) {
			$conn.socket.emit("sign-in", userInfo);
			console.log("Connection Established.", "Reconnected!");
		}
	};

	private onMessageReceived = (messageInfo: IMessageInfo) => {
		console.log(messageInfo);
		const {fromId, selfEcho, toId} = messageInfo;
		const {onMessageReceived, onUpdateUserPendingMessage, active} = this.props;

		const index = selfEcho ? toId : fromId;

		onMessageReceived(messageInfo, index!);
		if( active.type !== IdActiveType.Individual ||
			(	active.type === IdActiveType.Individual &&
				!selfEcho &&
				active.selectedUser &&
				active.selectedUser.id !== fromId
			)
		){
			onUpdateUserPendingMessage(fromId);
		}
	};

	private onChannelMessageReceived = (messageInfo: IMessageInfo) => {
		const {channelId, source} = messageInfo;
		const {onMessageReceived, onUpdateChannelPendingMessage, active} = this.props;
		if(source === IdMessageSource.Channel_Message) {
			onMessageReceived(messageInfo, channelId!);

			if(active.type !== IdActiveType.Channel ||
				(active.type === IdActiveType.Channel &&
						active.selectedChannel &&
						active.selectedChannel.key !== channelId
				)
			){
				onUpdateChannelPendingMessage(channelId!)
			}
		}
	};
}

export const mapState = (state: IState): IAppState => ({
	active: state.active,
	authInfo: state.auth
});
export const mapDispatch = (dispatch: Dispatch): IAppDispatch => ({
	onGetUserList: () => dispatch(actionUsersRequest()),
	onMessageReceived: (messageInfo: IMessageInfo, fromId: number | string) => dispatch(actionMessageReceive(messageInfo, fromId)),
	onUpdateUserPendingMessage: (userId: number) => dispatch(actionUsersPendingUpdate(userId)),
	onUpdateChannelPendingMessage: (channelKey: string) => dispatch(actionChannelPendingUpdate(channelKey)),
	onOnlineUserUpdate: (userIds: Array<string>) => dispatch(actionUsersOnlineUserStatusUpdate(userIds))
});

export default connect(mapState, mapDispatch)(AppDOM)
