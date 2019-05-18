import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {configureStore} from "./config/store";
import {ResponsiveWatcher} from "responsive-react";

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
        <ResponsiveWatcher/>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
