import React, {Component} from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: ''
  };

  componentDidMount() {
    axios.get('/posts')
      .then((result) => {
        const posts = result.data.slice(0, 4).map(post => ({...post, author: 'Oleh'}));
        return this.setState({posts});
      });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  renderPosts = () => {
    return this.state.posts.map(post => <Post key={post.id} title={post.title} author={post.author} clicked={() => this.postSelectedHandler(post.id)}/>);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#6d8cb0' }}>
        <section className="Posts">
          {this.renderPosts()}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost/>
        </section>
      </div>
    );
  }
}

export default Blog;