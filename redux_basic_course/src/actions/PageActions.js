import { ActionTypes } from './actionTypes';

export function getReposForActionCreator({ user, year }) {
  return function(dispatch, getState, extraArgument) {
    dispatch({
      type: ActionTypes.page.getRepositoriesRequest,
      payload: true,
    });
    fetch(`https://api.github.com/users/${user}/repos?sort=created`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.status >= 400) throw new Error(`Cannot get repos for user "${user}"`);
        return res.json();
      })
      .then(repositories => {
        const reposByYear = repositories
          .filter(repo => new Date(repo.created_at).getFullYear() === year)
          .map(repo => repo.name);
        dispatch({
          type: ActionTypes.page.getRepositoriesRequest,
          payload: false,
        });
        dispatch({
          type: ActionTypes.page.getRepositoriesSuccess,
          payload: { year, repositories: reposByYear },
        });
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.page.getRepositoriesRequest,
          payload: false,
        });
        dispatch({
          type: ActionTypes.page.getRepositoriesFail,
          payload: { errorMessage: err.message, error: true },
        });
      });
  };
}
