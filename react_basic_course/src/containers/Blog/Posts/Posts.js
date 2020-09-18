import React, {Component} from 'react';
import styles from './Posts.module.scss';
import Post from "../../../components/Post/Post";
import axios from "axios";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('/posts')
      .then((result) => {
        const posts = result.data.slice(0, 4).map(post => ({...post, author: 'Oleh'}));
        return this.setState({posts});
      });
  }

  renderPosts = () => {
    return this.state.posts.map(post => {
      return <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.props.postClicked(post.id)}
      />
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className={styles.Posts}>
          {this.renderPosts()}
        </section>
      </React.Fragment>
    );
  }
}

export default Posts;