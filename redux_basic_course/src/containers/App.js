import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { User, Page } from '../components';
import actions from '../actions';

const { pageActions, userAction } = actions;

class App extends Component {
  render() {
    const {
      gitUser,
      repositories,
      year,
      dispatchGetReposFor,
      showLoader,
      error,
      dispatchLoginFor,
      dispatchUserNameChange,
      userName,
      userError,
    } = this.props;

    return (
      <div className="App">
        <User
          gitUser={gitUser}
          loginUser={dispatchLoginFor}
          onUserNameChange={dispatchUserNameChange}
          userName={userName}
          userError={userError}
        />
        <Page
          repositories={repositories}
          year={year}
          getReposFor={dispatchGetReposFor}
          showLoader={showLoader}
          error={error}
          gitUser={gitUser}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    gitUser: store.user.gitUser,
    userName: store.user.userName,
    repositories: store.page.repositories,
    year: store.page.year,
    showLoader: store.page.showLoader,
    error: store.page.error,
    userError: store.user.userError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetReposFor: ({ user, year }) => dispatch(pageActions.getReposForActionCreator({ user, year })),
    dispatchLoginFor: user => dispatch(userAction.loginUserActionCreator(user)),
    dispatchUserNameChange: name => dispatch(userAction.changedUserName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
