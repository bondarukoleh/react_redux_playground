import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class User extends Component {
  render() {
    const { name, surname } = this.props.gitUser;

    return <p>Hi {`${name} ${surname}!`}</p>;
  }
}

User.protoTypes = {
  gitUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
};
