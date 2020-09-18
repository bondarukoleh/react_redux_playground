import React, {Component} from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Oleh'
  };

  addPost = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author:this.state.author
    }

    axios.post(`/posts`, data)
      .then(r => console.log('Posted ', r))
      .catch((e) => console.log(`Couldn't post `, e));
  };

  addEventValueToState = (property, event) => {
    this.setState({[property]: event.target.value});
  };

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(e) => this.addEventValueToState('title', e)}/>
        <label>Content</label>
        <textarea rows="4" value={this.state.content}
                  onChange={(e) => this.addEventValueToState('content', e)}/>
        <label>Author</label>
        <select value={this.state.author} onChange={(e) => this.addEventValueToState('author', e)}>
          <option value="Oleh">Oleh</option>
          <option value="Someone Else">Someone Else</option>
        </select>
        <button onClick={this.addPost}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;