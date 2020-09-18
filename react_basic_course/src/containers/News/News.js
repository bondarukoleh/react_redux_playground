import React, {Component} from 'react';
import {AddNews, NewsBlock} from "../../components";
import {Route} from "react-router-dom";
import './News.css';

class News extends Component {
  state = {
    news: null,
    isLoading: false,
  };

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
      this.setState({isLoading: false, news: json})
    })
      .catch((err) => {
      this.setState({isLoading: false});
      console.log(err);
    });
  }

  renderError(news, isLoading) {
    return news === null && isLoading === false && <div>Sorry we have troubles with getting news.</div>;
  };

  renderNews = () => {
    const {news, isLoading} = this.state;
    return (
      <React.Fragment>
        <AddNews onAddNews={this.handleAddNews}/>
        {isLoading && <p>Loading news...</p>}
        {Array.isArray(news) && <NewsBlock news={news}/>}
        {this.renderError(news, isLoading)}
      </React.Fragment>
    );
  };

  render() {
    return (
      <Route exact path={'/news'}>
        {this.renderNews()}
      </Route>
    );
  }
}

export default News;
