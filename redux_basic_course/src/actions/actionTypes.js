const ActionTypes = {
  page: {
    getRepositoriesRequest: 'GET_REPOS_REQUEST',
    getRepositoriesSuccess: 'GET_REPOS_SUCCESS',
    getRepositoriesFail: 'GET_REPOS_FAIL',
  },
  user: {
    loginRequest: 'LOGIN_REQUEST',
    loginSuccess: 'LOGIN_SUCCESS',
    loginFail: 'LOGIN_FAIL',
    userChangedName: 'USER_CHANGED_NAME',
  },
};

export { ActionTypes };
