import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { UserComponent } from '../components';

const { userAction } = actions;

class UserContainer extends Component {
  render() {
    const { onUserNameChange, loginUser, userName, gitUser, userError } = this.props;
    return (
      <UserComponent
        onUserNameChange={onUserNameChange}
        loginUser={loginUser}
        userName={userName}
        gitUser={gitUser}
        userError={userError}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    gitUser: store.user.gitUser,
    userName: store.user.userName,
    userError: store.user.userError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(userAction.loginUserActionCreator(user)),
    onUserNameChange: name => dispatch(userAction.changedUserName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
