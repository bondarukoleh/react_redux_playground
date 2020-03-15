import React from 'react';
import './App.css';
import {News, AddNews} from './components';

class App extends React.Component {
  state = {
    news: null,
    isLoading: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    console.log(`state`, state);
    let nextFilteredNews;
    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news];
      nextFilteredNews.forEach((item) => {
        if (item.text.toLowerCase().indexOf('spam') !== -1) {
          item.text = 'СПАМ';
        }
      });
      return {
        // aaa: nextFilteredNews,
      };
    }
    return null;
  }

  handleAddNews = ({id, authorText, areaText, headerText}) => {
    this.setState((state, props) => {
      return {news: [...state.news, {id, author: authorText, text: areaText, header: headerText}]};
    });
  };

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`http://localhost:3000/data/newsData.json`).then((response) => {
      return response.json();
    }).then(json => {
      setTimeout(() => this.setState({isLoading: false, news: json}), 500);
    }).catch((err) => {
      this.setState({isLoading: false});
      console.log(err);
    });
  }

  renderError(news, isLoading) {
    return news === null && isLoading === false && <div>Sorry we have troubles with getting news.</div>
  };

  render() {
    console.log('RENDERING')
    const {news, isLoading} = this.state;
    return (
      <React.Fragment>
        <AddNews onAddNews={this.handleAddNews}/>
        {isLoading && <p>Loading news...</p>}
        {Array.isArray(news) && <News news={news}/>}
        {this.renderError(news, isLoading)}
      </React.Fragment>
    );
  }
}

export default App;
