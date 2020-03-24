import { ActionTypes } from '../actions/actionTypes';

const initialState = {
  year: 2018,
  repositories: null,
  showLoader: false,
  error: null,
};

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.page.getRepositoriesRequest:
      return { ...state, showLoader: action.payload, error: null };
    case ActionTypes.page.getRepositoriesSuccess:
      return { ...state, repositories: action.payload.repositories, year: action.payload.year };
    case ActionTypes.page.getRepositoriesFail:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
