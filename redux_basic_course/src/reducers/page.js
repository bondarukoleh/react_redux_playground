import { ActionTypes } from '../actions/actionTypes';

const initialState = {
  year: 2018,
  repositories: [],
};

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.setYear:
      return { ...state, year: action.payload }; // this is where all components that subscribed for year - render
    default:
      return state;
  }
}
