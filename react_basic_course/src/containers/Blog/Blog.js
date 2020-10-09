import React, {Component} from 'react';
import NewPost from './NewPost/NewPost';
import styles from './Blog.module.scss';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch} from 'react-router-dom';
import News from '../News/News';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className={styles.Links}>
              <li><NavLink activeClassName={'current-path'} exact to="/">Home</NavLink></li>
              <li><NavLink activeClassName={'current-path'} exact to="/newPost">New Post</NavLink></li>
              <li><NavLink activeClassName={'current-path'} exact to={{pathname: '/news'}}>News</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path={'/newPost'} component={NewPost}/>
          <Route path={'/news'} component={News}/>
          <Route path={'/'} render={Posts}/>
        </Switch>
      </div>
    );
  }
}

export default Blog;