import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Page extends Component {
  handleYearButton = e => {
    const { getReposFor, gitUser } = this.props;
    getReposFor({ user: gitUser.login, year: Number(e.currentTarget.innerText) });
  };

  renderReposList(repositories) {
    return (
      <ol type="a">
        {repositories.map(repoName => {
          return <li key={Math.random()}>{repoName}</li>;
        })}
      </ol>
    );
  }

  showRepos = _ => {
    const { repositories, year, showLoader, error } = this.props;
    if (!showLoader && !error && repositories) {
      return (
        <div>
          <p>
            You've got {repositories.length} repository(s) in {year} year.
          </p>
          {repositories.length && this.renderReposList(repositories)}
        </div>
      );
    } else if (!showLoader && error) {
      return <p>Sorry we have an error. {error.errorMessage}</p>;
    }
  };

  showYearsButtons = () => {
    const { showLoader } = this.props;
    return (
      <div>
        <button className="btn" onClick={this.handleYearButton}>
          2017
        </button>
        <button className="btn" onClick={this.handleYearButton}>
          2018
        </button>
        <button className="btn" onClick={this.handleYearButton}>
          2019
        </button>
        <button className="btn" onClick={this.handleYearButton}>
          2020
        </button>
        {showLoader && <p>Loading your repositories...</p>}
      </div>
    );
  };

  render() {
    const { gitUser } = this.props;

    return (
      <div className="ib page">
        {gitUser && gitUser.login && this.showYearsButtons()}
        {gitUser && gitUser.login && this.showRepos()}
      </div>
    );
  }
}

Page.protoTypes = {
  repositories: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  getRepos: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
};
