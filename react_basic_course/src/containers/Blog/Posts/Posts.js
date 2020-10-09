import React, {Component} from 'react';
import styles from './Posts.module.scss';
import Post from "../../../components/Post/Post";
import axios from "axios";
import {Route, withRouter} from 'react-router-dom';
import FullPost from '../../../components/FullPost/FullPost';

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
        id={post.id}
        title={post.title}
        author={post.author}
      />
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className={styles.Posts}>
          {this.renderPosts()}
        </section>
        <Route exact path={`${this.props.match.url}/:id`} component={FullPost}/>
      </React.Fragment>
    );
  }
}

export default withRouter(Posts);