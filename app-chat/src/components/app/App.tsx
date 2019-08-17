import React from 'react';
import { Chat } from '../chat/Chat';
import {socket} from "../../utils/utilSocket";
import {Action, Dispatch} from "redux";
import {actionAppLoginRequest} from "./actionApp";
import {connect} from "react-redux";

interface IAppState {}
interface IAppDispatch {
  onAuthRequest: () => Action<any>;
}
interface IAppProps extends IAppState, IAppDispatch {}

const App: React.FC<IAppProps> = (props) => {
  socket.initiate();
  props.onAuthRequest();
  return (
    <Chat/>
  );
};

const mapDispatch = (dispatch: Dispatch): IAppDispatch => ({
  onAuthRequest:  () => dispatch(actionAppLoginRequest())
});

export default connect(null, mapDispatch)(App);
