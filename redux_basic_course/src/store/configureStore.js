import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// initiate store will be combined from all reducers, so we don't need to
// put it here
export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
