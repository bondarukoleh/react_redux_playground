import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UserComponent extends Component {
  handleUserNameChange = event => {
    const { onUserNameChange } = this.props;
    onUserNameChange(event.currentTarget.value);
  };

  handleUserLoginButtonClick = event => {
    const { loginUser, userName } = this.props;
    loginUser(userName);
  };

  showLoginForm = () => {
    return (
      <div>
        <p>Hi Unknown user, to get your repos please type your github login:</p>
        <input type="text" placeholder="Type your github login here..." onChange={this.handleUserNameChange} />
        <button onClick={this.handleUserLoginButtonClick}>Login</button>
      </div>
    );
  };

  showUserForm = () => {
    const user = this.props.gitUser;
    return (
      <div>
        <p>Hi {`${user.name ? user.name : user.login}`}!</p>
        <p>You are with github from {new Date(user.created_at).getFullYear()}!</p>
        <img alt="git_hub_avatar" src={user.avatar_url} />
      </div>
    );
  };

  render() {
    const { gitUser, userError } = this.props;
    return (
      <div className=" ib user">
        {!gitUser && this.showLoginForm()}
        {gitUser && gitUser.login && this.showUserForm()}
        {!gitUser && userError && <p className="error">Sorry we have an error. {userError.errorMessage}</p>}
      </div>
    );
  }
}

UserComponent.protoTypes = {
  gitUser: PropTypes.any.isRequired,
  loginUser: PropTypes.func.isRequired,
};
