import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { User, Page } from '../components';
import actions from '../actions';
const { pageActions } = actions;

class App extends Component {
  render() {
    const { gitUser, repositories, year, dispatchSetYear } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">Most committed repos</h3>
        </header>
        <p className="App-intro">Here will be Most committed repos</p>
        <User gitUser={gitUser} />
        <Page repositories={repositories} year={year} setYear={dispatchSetYear} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    gitUser: store.user.gitUser,
    repositories: store.page.repositories,
    year: store.page.year,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetYear: year => dispatch(pageActions.setYearActionCreator(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
