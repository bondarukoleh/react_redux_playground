import React, { Component } from 'react';

import { UserContainer, PageContainer } from '../containers';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <UserContainer />
        <PageContainer />
      </div>
    );
  }
}
