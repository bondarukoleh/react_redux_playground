import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { name, surname } = this.props.gitUser;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Мой топ фото</h1>
        </header>
        <p className="App-intro">Здесь будут мои самые залайканые фото</p>
        <p>Hi {`${name} ${surname}!`}</p>
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log('Passing store %o to props', store);
  return {
    gitUser: store.user.gitUser,
  };
};

export default connect(mapStateToProps)(App);
