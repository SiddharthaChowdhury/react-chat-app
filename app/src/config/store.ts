import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import {UtilSocket} from "../util/utilSocket";

const middlewares = [thunk];
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const initialState = {};

export const configureStore =  () => {
    return createStore(
        rootReducer,
        {...initialState},
        enhancers
    );
};
