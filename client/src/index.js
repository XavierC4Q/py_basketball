import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as Redux} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';

import App from './App';

import * as serviceWorker from './serviceWorker';
ReactDOM.render(
<Redux store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Redux>, document.getElementById('root'));

serviceWorker.unregister();
