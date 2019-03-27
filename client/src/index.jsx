import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Redux } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

import App from './App';

import * as serviceWorker from './serviceWorker';
ReactDOM.render(
	<Redux store={store}>
		<Router>
			<App />
		</Router>
	</Redux>,
	document.getElementById('root')
);

serviceWorker.unregister();
