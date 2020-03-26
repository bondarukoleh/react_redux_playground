import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { PageComponent } from '../components';

const { pageActions } = actions;

class PageContainer extends Component {
  render() {
    const { getReposFor, repositories, year, showLoader, error, gitUser } = this.props;

    return (
      <PageComponent
        getReposFor={getReposFor}
        repositories={repositories}
        year={year}
        showLoader={showLoader}
        error={error}
        gitUser={gitUser}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    year: store.page.year,
    repositories: store.page.repositories,
    showLoader: store.page.showLoader,
    error: store.page.error,
    gitUser: store.user.gitUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReposFor: ({ user, year }) => dispatch(pageActions.getReposForActionCreator({ user, year })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
