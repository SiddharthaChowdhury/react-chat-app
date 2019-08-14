import {createStore, applyMiddleware, compose, Action} from "redux";
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from "./rootReducer";
import rootEpic from "./rootEpic";
import {IState} from "./IState";

const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, IState>();

const middlewares = [
    epicMiddleware
];
const initialState = {};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

export const Store = createStore(rootReducer, initialState, enhancers);

epicMiddleware.run(rootEpic);