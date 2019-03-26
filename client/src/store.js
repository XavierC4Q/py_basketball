import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from './reducers/allreducers';

const middleware = [logger, thunk];

const store = createStore(
    allReducers,
    {},
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store