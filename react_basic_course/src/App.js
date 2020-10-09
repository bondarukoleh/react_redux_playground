import React from 'react';
import './App.css';
import Blog from './containers/Blog/Blog';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Blog/>
      </BrowserRouter>
    );
  }
}

export default App;
