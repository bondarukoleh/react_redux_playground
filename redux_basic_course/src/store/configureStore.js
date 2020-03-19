import { createStore } from 'redux';
import { rootReducer } from '../reducers';

// initiate store will be combined from all reducers, so we don't need to
// put it here
export const store = createStore(rootReducer);
