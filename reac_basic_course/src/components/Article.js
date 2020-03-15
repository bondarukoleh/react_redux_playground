import React from "react";
import PropTypes from "prop-types";

class Article extends React.Component {
  state = {
    textShown: false,
    readLessShown: false
  };

  handleReadMoreClick = (e) => {
    e.preventDefault();
    this.setState({textShown: true, readLessShown: true});
  };

  handleReadLessClick = (e) => {
    e.preventDefault();
    this.setState({textShown: false, readLessShown: false});
  };

  render() {
    const {textShown, readLessShown} = this.state;
    const {id, author, header, text} = this.props.articleData;
    return (
      <div id={id} className="article">
        <p className="news_author">{author}:</p>
        <p className="news_header">{header}</p>
        {!textShown && <a href="#readmore"
                          className="news_readmore"
                          onClick={this.handleReadMoreClick}>
          Read more...</a>}
        {textShown && <p className="news_text">{text}</p>}
        {readLessShown && <a href="#readless"
                             className="news_readless"
                             onClick={this.handleReadLessClick}>
          Read less...</a>}
      </div>
    );
  }
}

Article.propTypes = {
  articleData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
};

export {Article};
