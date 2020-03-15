import React from "react";
import PropTypes from "prop-types";
import {Article} from "./Article";

class News extends React.Component {
  state = {spamLessNews: null};

  static getDerivedStateFromProps({news}, state) {
    return {
      //TODO: news array with objects, we need deepClone here, this is a bad crutch
      spamLessNews: JSON.parse(JSON.stringify(news)).map((item) => {
        if (item.text.toLocaleLowerCase().includes(`spam`)) {
          item.text = 'THIS IS SPAM!!!';
        }
        return item;
      })
    };
  }

  getNews = () => {
    const {spamLessNews} = this.state;
    let newsElement = null;
    if (!!spamLessNews.length) {
      newsElement = spamLessNews.map((item) => <Article key={item.id} articleData={item}/>);
    } else {
      newsElement = <p>No news for today!</p>;
    }
    return newsElement;
  };

  renderNewsCount() {
    const {spamLessNews} = this.state;
    return spamLessNews.length
      ? <p className='news_count red'><strong>News count is: {spamLessNews.length}</strong></p>
      : null;
  }

  render() {
    return (<div className="news">
      {this.getNews()}
      {this.renderNewsCount()}
    </div>);
  }
}

News.propTypes = {news: PropTypes.array.isRequired};

export {News};
