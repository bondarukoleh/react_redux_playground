import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((result) => {
        this.setState({ posts: result.data });
      });
  }

  renderPosts = () => {
    return this.state.posts.map(post => <Post key={post.id} title={post.title}/>);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#6d8cb0' }}>
        <section className="Posts">
          {this.renderPosts()}
        </section>
        <section>
          <FullPost/>
        </section>
        <section>
          <NewPost/>
        </section>
      </div>
    );
  }
}

export default Blog;