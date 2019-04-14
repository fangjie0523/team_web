import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './js/store/Store'
import { Provider } from 'react-redux'
import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.css'
import Page from './js/page'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
