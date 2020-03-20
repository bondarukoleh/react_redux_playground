import { ActionTypes } from './actionTypes';

export function loginUserActionCreator(user) {
  return function(dispatch, getState, extraArgument) {
    dispatch({
      type: ActionTypes.user.loginRequest,
      payload: true,
    });
    fetch(`https://api.github.com/users/${user}`)
      .then(res => {
        if (res.status >= 400) throw new Error(`Cannot login with user: "${user}"`);
        return res.json();
      })
      .then(userData => {
        dispatch({
          type: ActionTypes.user.loginRequest,
          payload: false,
        });
        dispatch({
          type: ActionTypes.user.loginSuccess,
          payload: userData,
        });
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.user.loginRequest,
          payload: false,
        });
        dispatch({
          type: ActionTypes.user.loginFail,
          payload: { errorMessage: err.message, error: true },
        });
      });
  };
}

export function changedUserName(name) {
  return {
    type: ActionTypes.user.userChangedName,
    payload: name,
  };
}
