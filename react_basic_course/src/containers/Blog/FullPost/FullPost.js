import React, {Component} from 'react';
import './FullPost.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class FullPost extends Component {
  state = {
    postData: null,
    id: this.props.match.params.id
  };

  componentDidMount() {
    axios.get(`/posts/${this.state.id}`)
      .then((result) => this.setState({postData: result.data}));
  }

  deletePost = () => {
    axios.delete(`/posts/${this.state.id}`)
      .then((result) => console.log(result));
  };

  render() {
    let post = <p style={{textAlign: "center"}}>Couldn't get this Post!</p>;
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

export default withRouter(FullPost);