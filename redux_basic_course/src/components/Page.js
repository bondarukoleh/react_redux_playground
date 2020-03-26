import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PageComponent extends Component {
  handleYearButton = e => {
    const { getReposFor, gitUser } = this.props;
    getReposFor({ user: gitUser.login, year: Number(e.currentTarget.innerText) });
  };

  renderReposList(repositories) {
    return (
      <div className="repo">
        <ol>
          {repositories.map(repoName => {
            return <li key={Math.random()}>{repoName}</li>;
          })}
        </ol>
      </div>
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
      return <p className="error">Sorry we have an error. {error.errorMessage}</p>;
    }
  };

  showYearsButtons = () => {
    const { showLoader } = this.props;
    const years = [2017, 2018, 2019, 2020];
    return (
      <div>
        {years.map(year => {
          return (
            <button key={year} className="btn" onClick={this.handleYearButton}>
              {year}
            </button>
          );
        })}
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

PageComponent.protoTypes = {
  repositories: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  getRepos: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
};
