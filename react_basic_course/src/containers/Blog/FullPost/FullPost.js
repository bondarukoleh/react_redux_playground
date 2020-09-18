import React, {Component} from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
  state = {
    postData: null
  };

  componentDidMount() {
    axios.get(`/posts/${this.props.id}`)
      .then((result) => this.setState({postData: result.data}));
  }

  deletePost = () => {
    axios.delete(`/posts/${this.props.id}`)
      .then((result) => console.log(result));
  };

  render() {
    let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{textAlign: "center"}}>Loading...</p>;
    }
    if (this.state.postData) {
      post = (
        <div className="FullPost">
          <h1>{this.state.postData.title}</h1>
          <p>{this.state.postData.body}</p>
          <div className="Edit">
            <button onClick={this.deletePost} className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;