import React, {Component} from 'react';
import NewPost from './NewPost/NewPost';
import styles from './Blog.module.scss';
import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';
import {Route, NavLink, Switch} from 'react-router-dom';
import News from '../News/News';

class Blog extends Component {
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className={styles.Links}>
              <li><NavLink
                activeClassName={'current-path'}
                exact
                to="/"
              >Home</NavLink></li>
              <li><NavLink exact to="/newPost">New Post</NavLink></li>
              <li><NavLink exact to={{pathname: '/news'}}>News</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path={'/'} render={Posts}/>
          <Route exact path={'/newPost'} component={NewPost}/>
          <Route exact path={'/:id'} component={FullPost}/>
          <Route exact path={'/news'} component={News}/>
        </Switch>
      </div>
    );
  }
}

export default Blog;