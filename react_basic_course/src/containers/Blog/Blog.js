import React, {Component} from 'react';
import NewPost from './NewPost/NewPost';
import './Blog.css';
import Posts from "./Posts/Posts";
import FullPost from "./FullPost/FullPost";
import {Route, Link} from 'react-router-dom';
import News from "../News/News";

class Blog extends Component {
  state = {
    selectedPostId: null
  };

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  };

  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className={'Links'}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/newPost">New Post</Link></li>
              <li><Link to={{pathname: '/news'}}>News</Link></li>
            </ul>
          </nav>
        </header>
        <Route exact path={'/'} render={() => <Posts postClicked={this.postSelectedHandler}/>}/>
        <Route exact path={'/newPost'} component={NewPost}/>
        <Route exact path={'/fullPost'} render={() => <FullPost id={this.state.selectedPostId}/>}/>
        <Route exact path={'/news'} component={News}/>
      </div>
    );
  }
}

export default Blog;