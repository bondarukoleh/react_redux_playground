import React, {Component, lazy, Suspense} from 'react';
import asyncComponent from '../../hoc/asyncComponents';
import styles from './Blog.module.scss';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

const AsyncNewPosts = asyncComponent(() => {
  return import('../../components/NewPost/NewPost');
});

const LazyNews = lazy(() => import('../News/News'));

class Blog extends Component {
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className={styles.Links}>
              <li><NavLink activeClassName={'current-path'} exact to="/posts">Posts</NavLink></li>
              <li><NavLink activeClassName={'current-path'} exact to="/newPost">New Post</NavLink></li>
              <li><NavLink activeClassName={'current-path'} exact to={{pathname: '/news'}}>News</NavLink></li>
            </ul>
          </nav>
        </header>
        <Suspense fallback={<div> Loading... </div>}>
          <Switch>
            <Route path={'/posts'} render={() => <Posts/>}/>
            <Route path={'/newPost'} component={AsyncNewPosts}/>
            <Route path={'/news'} component={LazyNews}/>
            <Route render={() => <h1> We don't know how you have got here. </h1>}/>
            <Redirect from='/' to='/posts'/>
          </Switch>
        </Suspense>

      </div>
    );
  }
}

export default Blog;