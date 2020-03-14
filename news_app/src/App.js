import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

const myNews = [
  {
    id: 1,
    author: 'John Doe',
    header: 'Something happened on Thursday the 4th of March...',
    text: 'A Very scary story with murder in your neighborhood, please pay respect the police and aware of criminals.'
  },
  {
    id: 2,
    author: 'John Smith',
    header: 'The CoronaVirus is a shitty crap',
    text: `A Story about virus, sick people, and in the end hope that science will beat this shit, and everybody will
        be healed`
  },
  {
    id: 3,
    author: 'Guest',
    header: 'Hi guys, just want to share with you my success story...',
    text: 'Story about how someone achieved some doubtful success, by accident, and now he boasts how cool he is.'
  },
  {
    id: 4,
    author: 'Ad',
    header: 'To find a girlfriend, earn a pile of money and make bigger your em..., just try this...',
    text: 'Crap about some super pills that makes you a superman, but in fact just an expensive placebo.'
  },
];

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
        {!textShown && <a href="#"
                          className="news_readmore"
                          onClick={this.handleReadMoreClick}>
          Read more...</a>}
        {textShown && <p className="news_text">{text}</p>}
        {readLessShown && <a href="#"
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

class News extends React.Component {
  state = {
    clicksOnTotal: 0
  };

  getNews = () => {
    const newsAvailable = !!this.props.news.length;
    let newsTemplate = [];
    if (newsAvailable) {
      newsTemplate = this.props.news.map((item) => <Article key={item.id} articleData={item}/>);
    } else {
      newsTemplate = <p>No news for today!</p>;
    }
    return newsTemplate;
  };

  renderNewsCount() {
    return this.props.news.length && <p className='news_count red'>
      <strong>News count is: {this.props.news.length}</strong></p>;
  }

  render() {
    return (<div className="news">
      {this.getNews()}
      {this.renderNewsCount()}
    </div>);
  }
}

News.propTypes = {
  news: PropTypes.array.isRequired
};

class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authorText: '', areaText: '', checkBoxState: false, headerText: ''};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {authorText, areaText, headerText} = this.state;
    this.props.onAddNews({id: Date.now(), authorText, areaText, headerText});
    this.setState({authorText, areaText: '', headerText: ''})
  };

  handleTextChange = (e) => {
    const {id, value} = e.currentTarget;
    this.setState({[id]: value});
  };

  handleCheckBoxChange = (e) => {
    this.setState((state, props) => {
      return {checkBoxState: !state.checkBoxState};
    });
  };

  validateForm = () => {
    return !(this.state.checkBoxState
      && this.state.areaText.trim().length > 0
      && this.state.headerText.trim().length > 0
      && this.state.authorText.trim().length > 0);
  };

  render() {
    console.log('RENDERED INPUT %o', this);
    const {authorText, areaText, headerText} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="add_news">
        <input className="add_author"
               placeholder="News author..."
               id="authorText"
               onChange={this.handleTextChange} value={authorText}></input>
        <input className="add_author"
               placeholder="News header..."
               id="headerText"
               onChange={this.handleTextChange} value={headerText}></input>
        <textarea className="add_news_text" placeholder="Type the text here..."
                  id="areaText" onChange={this.handleTextChange} value={areaText}></textarea>
        <label className="agreement">
          I agree with rules:
          <input type="checkbox" onChange={this.handleCheckBoxChange} checked={this.state.checkBoxState}></input>
        </label>
        <button type="submit"
                className="add_new_news"
                disabled={this.validateForm()}>Click to get news text
        </button>
      </form>
    );
  }
}
AddNews.propTypes = {
  onAddNews: PropTypes.func.isRequired
};

class App extends React.Component {
  state = {
    news: myNews
  };

  handleAddNews = ({id, authorText, areaText, headerText}) => {
    this.setState((state, props) => {
      return {news: [...state.news, {id, author: authorText, text: areaText, header: headerText}]}
    })
  };

  render() {
    return (
      <React.Fragment>
        <AddNews onAddNews={this.handleAddNews}/>
        <News news={this.state.news}/>
      </React.Fragment>
    );
  }
}

// ReactDOM.render(<App/>, document.getElementById('root'));

export default App;
