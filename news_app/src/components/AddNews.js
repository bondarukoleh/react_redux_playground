import React from "react";
import PropTypes from "prop-types";

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

export {AddNews}
