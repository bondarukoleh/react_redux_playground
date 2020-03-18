import { createStore } from 'redux';
import { initialState, rootReducer } from '../reducers';

export const store = createStore(rootReducer, initialState);
