import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Page extends Component {
  handleYearButton = e => {
    this.props.setYear(Number(e.currentTarget.innerText));
  };

  render() {
    const { repositories, year } = this.props;

    return (
      <div>
        <button onClick={this.handleYearButton}>2017</button>
        <button onClick={this.handleYearButton}>2018</button>
        <button onClick={this.handleYearButton}>2019</button>
        <button onClick={this.handleYearButton}>2020</button>
        <p>
          You've got {repositories.length} repositories in {year} year.
        </p>
      </div>
    );
  }
}

Page.protoTypes = {
  repositories: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  setYear: PropTypes.func.isRequired,
};
