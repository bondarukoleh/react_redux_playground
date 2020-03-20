import { ActionTypes } from '../actions';

const initialState = {
  userName: 'Unknown',
  gitUser: null,
  userError: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.user.userChangedName:
      return { ...state, userName: action.payload };
    case ActionTypes.user.loginSuccess:
      return { ...state, gitUser: action.payload };
    case ActionTypes.user.loginFail:
      return { ...state, userError: action.payload };
    default:
      return state;
  }
}
