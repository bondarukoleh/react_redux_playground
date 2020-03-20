import { ActionTypes } from './actionTypes';
import { getReposForActionCreator } from './PageActions';
import { loginUserActionCreator, changedUserName } from './UserActions';

export default {
  pageActions: { getReposForActionCreator },
  userAction: { loginUserActionCreator, changedUserName },
};

export { ActionTypes };
